export default class toColor {
  HUE_MAX = 360;

  constructor(seed, options) {
    this.options = options || {};
    this.seed = typeof seed === 'string' ? this._stringToInteger(seed) : seed;
    this.knownHue = [];
    this.knownSaturation = [];
    this.knownBrightness = [];
  }

  getColor() {
    const { brightness, saturation } = this.options;
    const h = this._pickHue();
    const s = this._pickSaturation(h, saturation || 0);
    const b = this._pickBrightness(h, s, brightness || 0);
    const hsl = this._HSVtoHSL([h, s, b]);

    return {
      hsl: {
        raw: hsl,
        formatted: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`
      }
    };
  }

  _pickHue = () => {
    let hue = this._pseudoRandom([0, this.HUE_MAX]);
    const min = hue % this.HUE_MAX;
    const max = (hue + 1) % this.HUE_MAX;

    hue = this._pseudoRandom([min, max]);

    // Red is on both ends of the color spectrum. Instead of storing red as two
    // ranges, lookup is grouped in colorDictionary using negative numbers.
    if (hue < 0) hue = this.HUE_MAX + hue;

    hue = this._distribute(this.knownHue, hue, 2);

    this.knownHue.push(hue);
    return hue;
  }

  _pickSaturation = (h, modifier) => {
    const SATURATION_MAX = 100;
    const saturationRange = this._getColorInfo(h)[2];
    let min = saturationRange[0];
    let max = saturationRange[1];
    min = modifier > 0 ? this._clamp(min + modifier, 0, SATURATION_MAX) : min;
    max = modifier < 0 ? this._clamp(max + modifier, 0, SATURATION_MAX) : max;
    const saturation = this._distribute(this.knownSaturation, this._pseudoRandom([min, max], 1));
    this.knownSaturation.push(saturation);
    return saturation;
  }
  

  _pickBrightness = (h, s, modifier) => {
    const BRIGHTNESS_MAX = 100;
    let min = this._getMinimumBrightness(h, s);
    let max = 100;
    min = modifier > 0 ? this._clamp(min + modifier, 0, BRIGHTNESS_MAX) : min;
    max = modifier < 0 ? this._clamp(max + modifier, 0, BRIGHTNESS_MAX) : max;
    const brightness = this._distribute(this.knownBrightness, this._pseudoRandom([min, max], 1));
    this.knownBrightness.push(brightness);
    return brightness;
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

  _distribute = (known, candidate, deviation) => {
    let distributedValue = candidate;

    // Increment candidate by deviation until deviation from known is false.
    while (true) {
      if (known.some(v => Math.abs(distributedValue - v) <= deviation)) {
        distributedValue = distributedValue + deviation; 
      } else {
        return distributedValue;
      }
    }
  }

  _clamp = (n, min, max) => n <= min ? min : n >= max ? max : n;

  _getColorInfo = (hue) => {
    // Red is on both ends of the color spectrum. Map them together:
    if (hue >= 334 && hue <= this.HUE_MAX) {
      hue -= this.HUE_MAX;
    }

    return this._colorDictionary.find((c) => hue >= c[0][0] && hue <= c[0][1]);
  }

  _HSVtoHSL = (hsv) => {
    const round = (num) => Math.trunc((num + Number.EPSILON) * 100) / 100;
    const h = hsv[0];
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const k = (2 - s) * v;
    return [
      h,
      round((((s * v) / (k < 1 ? k : 2 - k)) * 10000) / 100),
      round((k / 2) * 100)
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
