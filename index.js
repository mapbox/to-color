const HUE_MAX = 360;
const BRIGHTNESS_MAX = 100;
const SATURATION_MAX = 100;
let colorRanges = [];
let seed;

// prettier-ignore
const colorDictionary = [
  // red
  [[-26, 18], [[20, 100], [30, 92], [40, 89], [50, 85], [60, 78], [70, 70], [80, 60], [90, 55], [100, 50]]],
  // orange
  [[18, 46], [[20, 100], [30, 93], [40, 88], [50, 86], [60, 85], [70, 70], [100, 70]]],
  // yellow
  [[46, 62], [[25, 100], [40, 94], [50, 89], [60, 86], [70, 84], [80, 82], [90, 80], [100, 75]]],
  // green
  [[62, 178], [[30, 100], [40, 90], [50, 85], [60, 81], [70, 74], [80, 64], [90, 50], [100, 40]]],
  // blue
  [[178, 257], [[20, 100], [30, 86], [40, 80], [50, 74], [60, 60], [70, 52], [80, 44], [90, 39], [100, 35]]],
  // purple
  [[257, 282], [[20, 100], [30, 87], [40, 79], [50, 70], [60, 65], [70, 59], [80, 52], [90, 45], [100, 42]]],
  // pink
  [[282, 334], [[20, 100], [30, 90], [40, 86], [60, 84], [80, 80], [90, 75], [100, 73]]]
].map(color => {
  const lowerBounds = color[1];
  // Map saturation min/max range
  color.push([lowerBounds[0][0], lowerBounds[lowerBounds.length - 1][0]]);
  return color;
});

function pickHue() {
  let hueRange = [0, HUE_MAX];
  let hue = pseudoRandom(hueRange);

  if (colorRanges.length) {
    // Distribution appears better when the seed value is mutated again.
    hue = pseudoRandom(hueRange);

    // Each of colorRanges.length ranges has a length equal approximatelly one step
    const step = (hueRange[1] - hueRange[0]) / colorRanges.length;

    let j = parseInt((hue - hueRange[0]) / step);

    // Modify `j` until it matches a color range index that hasn't been taken
    for (let range = 0; range < colorRanges.length; range++) {
      if (!colorRanges[j]) {
        colorRanges[j] = true;
        break;
      }

      j = (j + 2) % colorRanges.length;
    }

    const min = (hueRange[0] + j * step) % HUE_MAX;
    const max = (hueRange[0] + (j + 1) * step) % HUE_MAX;

    hueRange = [min, max];

    hue = pseudoRandom(hueRange);
  }

  // Red is on both ends of the color spectrum. Instead of storing red as two
  // ranges, lookup is grouped in colorDictionary using negative numbers.
  if (hue < 0) hue = HUE_MAX + hue;

  return hue;
}

const clamp = (n, min, max) => n <= min ? min : n >= max ? max : n;

function pickSaturation(h, modifier) {
  const saturationRange = getColorInfo(h)[2];
  let sMin = saturationRange[0];
  let sMax = saturationRange[1];
  sMin = modifier > 0 ? clamp(sMin + modifier, 0, SATURATION_MAX) : sMin;
  sMax = modifier < 0 ? clamp(sMax + modifier, 0, SATURATION_MAX) : sMax;
  return pseudoRandom([sMin, sMax]);
}

function pickBrightness(h, s, modifier) {
  let bMin = getMinimumBrightness(h, s);
  let bMax = 100;
  bMin = modifier > 0 ? clamp(bMin + modifier, 0, BRIGHTNESS_MAX) : bMin;
  bMax = modifier < 0 ? clamp(bMax + modifier, 0, BRIGHTNESS_MAX) : bMax;
  return pseudoRandom([bMin, bMax]);
}

function getMinimumBrightness(h, s) {
  const lowerBounds = getColorInfo(h)[1];
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

function getColorInfo(hue) {
  // Red is on both ends of the color spectrum. Map them together:
  if (hue >= 334 && hue <= HUE_MAX) {
    hue -= HUE_MAX;
  }

  return colorDictionary.find((c) => hue >= c[0][0] && hue <= c[0][1]);
}

// A linear congruential generator (LCG) algorithm that yields a sequence of
// pseudo-randomized numbers calculated with a discontinuous piecewise linear
// equation. see: indiegamr.com/generate-repeatable-random-numbers-in-js
function pseudoRandom(range) {
  const max = range[1] || 1;
  const min = range[0] || 0;
  seed = (seed * 9301 + 49297) % 233280;
  const rnd = seed / 233280;
  return Math.trunc(min + rnd * (max - min));
}

function HSVtoHSL(hsv) {
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

function stringToInteger(string) {
  let total = 0;
  for (let i = 0; i !== string.length; i++) {
    if (total >= Number.MAX_SAFE_INTEGER) break;
    total += string.charCodeAt(i);
  }
  return total;
}

function toColor(input, options) {
  options = options || {};
  if (Array.isArray(input)) {
    colorRanges = []; // Clear any previously held ranges

    // Value false at index i means the range i is not taken yet.
    input.forEach(() => colorRanges.push(false));

    return input.map((color) => toColor(color, options));
  }

  seed = typeof input === 'string' ? stringToInteger(input) : input;

  const h = pickHue();
  const s = pickSaturation(h, options.saturation || 0);
  const b = pickBrightness(h, s, options.brightness || 0);
  const hsl = HSVtoHSL([h, s, b]);

  return {
    hsl: {
      raw: hsl,
      formatted: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`
    }
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = toColor;
}
