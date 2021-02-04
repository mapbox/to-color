import { differenceCiede2000 } from 'd3-color-difference';

export default class toColor {
  HUE_MAX = 360;

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
    const b = this._pickBrightness(h, s);
    const hsl = this._HSVtoHSL(h, s, b);
    const formatted = this._formatHSL(hsl);
    const PASSABLE_DISTANCE = 50; 

    // The larger `count` grows, we need to divide actual distance to avoid
    // hitting a maxiumum call stack error.
    const ACTUAL_DISTANCE = PASSABLE_DISTANCE / Math.pow(1.25, count);

    // Detect color similarity. If values are too close to one another, call
    // getColor until enough dissimilarity is acheived.
    if (this.known.length &&
        this.known.some(v => differenceCiede2000(v, formatted) < ACTUAL_DISTANCE)) {
      count++
      return this.getColor(count);
    } else {
      this.known.push(formatted);
      // Apply modifiers after distribution check + regeneration to ensure 
      // colors with brightness/saturation adjustments remain the same.
      return this._colorWithModifiers(h, s, b) 
    }
  }

  _colorWithModifiers = (h, s, b) => {
    const clamp = (n, min, max) => n <= min ? min : n >= max ? max : n;
    const { brightness, saturation } = this.options;

    // Modify brightness/saturation if provided
    s = saturation ? clamp(s + saturation, 0, 100) : s;
    b = brightness ? clamp(b + brightness, 0, 100) : b;

    // re-run conversion accounting for post modifications to s and b.
    const hsl = this._HSVtoHSL(h, s, b);

    return {
      hsl: {
        raw: hsl,
        formatted: this._formatHSL(hsl)
      }
    };
  }
  
  _formatHSL = hsl => `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`

  _pickHue = () => {
    let hue = this._pseudoRandom([0, this.HUE_MAX]);
    const min = hue % this.HUE_MAX;
    const max = (hue + 1) % this.HUE_MAX;

    hue = this._pseudoRandom([min, max]);

    // Red is on both ends of the color spectrum. Instead of storing red as two
    // ranges, lookup is grouped in colorDictionary using negative numbers.
    if (hue < 0) hue = this.HUE_MAX + hue;

    return hue;
  }

  _pickSaturation = (h) => {
    const saturationRange = this._getColorInfo(h)[2];
    let min = saturationRange[0];
    let max = saturationRange[1];
    return this._pseudoRandom([min, max]);
  }
  

  _pickBrightness = (h, s) => {
    let min = this._getMinimumBrightness(h, s);
    let max = 100;
    return this._pseudoRandom([min, max]);
  }

  _getMinimumBrightness = (h, s) => {
    const lowerBounds = this._getColorInfo(h)[1];
    for (let i = 0; i < lowerBounds.length - 1; i++) {
      const s1 = lowerBounds[i][0];
      const v1 = lowerBounds[i][1];
      const s2 = lowerBounds[i + 1][0];
      const v2 = lowerBounds[i + 1][1];
      if (s >= s1 && s <= s2) {
        const m = (v2 - v1) / (s2 - s1);
        const b = v1 - m * s1;
        return m * s + b;
      }
    }
    return 0;
  }

  // A linear congruential generator (LCG) algorithm that yields a sequence of
  // pseudo-randomized numbers calculated with a discontinuous piecewise linear
  // equation. see: indiegamr.com/generate-repeatable-random-numbers-in-js
  _pseudoRandom = (range) => {
    const max = range[1] || 1;
    const min = range[0] || 0;
    this.seed = (this.seed * 9301 + 49297) % 233280;
    const rnd = this.seed / 233280;
    return Math.trunc(min + rnd * (max - min));
  }

  _getColorInfo = (hue) => {
    // Red is on both ends of the color spectrum. Map them together:
    if (hue >= 334 && hue <= this.HUE_MAX) {
      hue -= this.HUE_MAX;
    }

    return this._colorDictionary.find((c) => hue >= c[0][0] && hue <= c[0][1]);
  }

  _HSVtoHSL = (h, s, v) => {
    const round = (num) => Math.trunc((num + Number.EPSILON) * 100) / 100;
    const l = (2 - s / 100) * v / 2;
    let saturation = s * v / (l < 50 ? l * 2 : 200 - l * 2);

    // Handle division-by-zero
    if (isNaN(saturation)) saturation = 0;

    return [
      h,
      round(saturation),
      round(l)
    ];
  }

  _stringToInteger = (string) => {
    let total = 0;
    for (let i = 0; i !== string.length; i++) {
      if (total >= Number.MAX_SAFE_INTEGER) break;
      total += string.charCodeAt(i);
    }
    return total;
  }

  // prettier-ignore
  _colorDictionary = [
    [[-26, 18], [[20, 100], [30, 92], [40, 89], [50, 85], [60, 78], [70, 70], [80, 60], [90, 55], [100, 50]]], // red
    [[18, 46], [[20, 100], [30, 93], [40, 88], [50, 86], [60, 85], [70, 70], [100, 70]]], // orange
    [[46, 62], [[25, 100], [40, 94], [50, 89], [60, 86], [70, 84], [80, 82], [90, 80], [100, 75]]], // yellow
    [[62, 178], [[30, 100], [40, 90], [50, 85], [60, 81], [70, 74], [80, 64], [90, 50], [100, 40]]], // green
    [[178, 257], [[20, 100], [30, 86], [40, 80], [50, 74], [60, 60], [70, 52], [80, 44], [90, 39], [100, 35]]], // blue
    [[257, 282], [[20, 100], [30, 87], [40, 79], [50, 70], [60, 65], [70, 59], [80, 52], [90, 45], [100, 42]]], // purple
    [[282, 334], [[20, 100], [30, 90], [40, 86], [60, 84], [80, 80], [90, 75], [100, 73]]] // pink
  ].map(color => {
    const lowerBounds = color[1];
    const sMin = lowerBounds[0][0];
    const sMax = lowerBounds[lowerBounds.length - 1][0];
    color.push([sMin, sMax]);
    return color;
  })
}
