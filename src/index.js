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
      this.seed = typeof seed === 'string' ? this._stringToInteger(seed) : seed;
    } else {
      throw new TypeError('Seed value must be a number or string');
    }

    this.known = [];
  }

  getColor(count = 0) {
    const h = this._pickHue();
    const s = this._pickSaturation(h);
    const l = this._pickLightness(h, s);

    const { hsl } = this._HSLuvify(h, s, l);
    const PASSABLE_DISTANCE = 60;

    // The larger `count` grows, we need to divide actual distance to avoid
    // hitting a maxiumum call stack error.
    const ACTUAL_DISTANCE = PASSABLE_DISTANCE / Math.pow(1.05, count);

    // Detect color similarity. If values are too close to one another, call
    // getColor until enough dissimilarity is achieved.
    if (
      this.known.length &&
      this.known.some(
        (v) => differenceCiede2000(v, hsl.formatted) < ACTUAL_DISTANCE
      )
    ) {
      return this.getColor(count + 1);
    } else {
      this.known.push(hsl.formatted);
      // Apply modifiers after distribution check + regeneration to ensure
      // colors with brightness/saturation adjustments remain the same.
      return this._colorWithModifiers(h, s, l);
    }
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
