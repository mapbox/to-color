import { differenceCiede2000 } from './d3-color-difference';
import { color, hsl } from 'd3-color';
import { Hsluv } from 'hsluv';

export default class toColor {
  HUE_MAX = 360;

  hues = {
    red: [-26, 18],
    orange: [18, 46],
    yellow: [46, 62],
    green: [62, 178],
    blue: [178, 257],
    purple: [257, 282],
    pink: [282, 334]
  };

  constructor(seed, options) {
    this.options = options || {};
    if (typeof seed === 'string' || typeof seed === 'number') {
      this.rootSeed =
        typeof seed === 'string' ? this._stringToInteger(seed) : seed;
    } else {
      throw new TypeError('Seed value must be a number or string');
    }

    this.seed = this.rootSeed;
    this.known = [];
    this.cache = new Map();
  }

  getColor(key) {
    if (typeof key === 'string') {
      if (this.cache.has(key)) return this.cache.get(key);

      const color = this._getDeterministicColor(key);
      this.cache.set(key, color);
      return color;
    }

    return this._getSequentialColor();
  }

  _getDeterministicColor(key) {
    const combined = this._stringToInteger(`${this.rootSeed}:${key}`);

    const h = this._mapIndexToHue(combined);
    const s = this._mapIndexToRange(combined >> 2, 60, 100);
    const l = this._mapIndexToRange(combined >> 3, 35, 80);

    return this._colorWithModifiers(h, s, l);
  }

  _getSequentialColor(count = 0) {
    const h = this._pickHue();
    const s = this._pickSaturation();
    const l = this._pickLightness();

    const { hsl } = this._HSLuvify(h, s, l);
    const PASSABLE_DISTANCE = 60;
    const ACTUAL_DISTANCE = PASSABLE_DISTANCE / Math.pow(1.05, count);

    if (
      this.known.length &&
      this.known.some(
        (v) => differenceCiede2000(v, hsl.formatted) < ACTUAL_DISTANCE
      )
    ) {
      return this._getSequentialColor(count + 1);
    } else {
      this.known.push(hsl.formatted);
      return this._colorWithModifiers(h, s, l);
    }
  }

  _mapIndexToHue(index) {
    // A hybrid approach to color distance checking in _getSequentialColor but
    // for `_getDeterministicColor`. Attempts to “spread” hash values evenly to
    // reduce the same hues appearing next to one another.
    const GOLDEN_RATIO_CONJUGATE = (Math.sqrt(5) - 1) / 2; // ≈ 0.61803398875
    return Math.round(((index * GOLDEN_RATIO_CONJUGATE) % 1) * this.HUE_MAX);
  }

  _mapIndexToRange(index, min, max) {
    return min + (index % (max - min));
  }

  _clamp = (n, min, max) => (n <= min ? min : n >= max ? max : n);

  _colorWithModifiers = (h, s, l) => {
    const percentage = (n, per) => (n / 100) * per * 100;
    const { brightness, saturation } = this.options;

    // Modify brightness/saturation if provided
    s = saturation ? this._clamp(percentage(saturation, s), 0, 100) : s;
    l = brightness ? this._clamp(percentage(brightness, l), 0, 100) : l;

    return this._HSLuvify(h, s, l);
  };

  _HSLuvify = (h, s, l) => {
    const conv = new Hsluv();
    conv.hsluv_h = h;
    conv.hsluv_s = s;
    conv.hsluv_l = l;
    conv.hsluvToHex();

    const c = color(conv.hex);
    const raw = hsl(c);

    // Convert and round
    const hRounded = Math.round(this._clamp(raw.h, 0, 360));
    const sRounded = Math.round(this._clamp(raw.s * 100, 0, 100));
    const lRounded = Math.round(this._clamp(raw.l * 100, 0, 100));

    return {
      hsl: {
        raw: [hRounded, sRounded, lRounded],
        formatted: `hsl(${hRounded}, ${sRounded}%, ${lRounded}%)`
      }
    };
  };

  _pickHue = () => {
    let hue = this._pseudoRandom([0, this.HUE_MAX]);
    const min = hue % this.HUE_MAX;
    const max = (hue + 1) % this.HUE_MAX;

    hue = this._pseudoRandom([min, max]);

    // Red is on both ends of the color spectrum. Instead of storing red as two
    // ranges, lookup is grouped in `this.hue` as negative numbers.
    if (hue < 0) hue = this.HUE_MAX + hue;

    // Limit the max of some hues if the option is passed.
    const { limit } = this.options;

    if (limit && limit.length) {
      for (let i = 0; i !== limit.length; i++) {
        const hueRange = this.hues?.[limit[i]];
        if (hueRange && hue > hueRange[0] && hue <= hueRange[1]) {
          return this._pickHue();
        }
      }
    }

    return hue;
  };

  _pickSaturation = () => {
    // HSLuv saturation can be high without RGB clipping, so keep near upper range
    return this._pseudoRandom([60, 100]);
  };

  _pickLightness = () => {
    // Avoid extremes for better contrast
    return this._pseudoRandom([35, 80]);
  };

  // A linear congruential generator (LCG) algorithm that yields a sequence of
  // pseudo-randomized numbers calculated with a discontinuous piecewise linear
  // equation. see: indiegamr.com/generate-repeatable-random-numbers-in-js
  _pseudoRandom = (range) => {
    const max = range[1] || 1;
    const min = range[0] || 0;
    this.seed = (this.seed * 9301 + 49297) % 233280;
    const rnd = this.seed / 233280;
    return Math.trunc(min + rnd * (max - min));
  };

  _stringToInteger = (string) => {
    let total = 0;
    for (let i = 0; i !== string.length; i++) {
      if (total >= Number.MAX_SAFE_INTEGER) break;
      total += string.charCodeAt(i);
    }
    return total;
  };
}
