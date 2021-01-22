const colorRanges = [];
let seed;

const colorDictionary = [
  ['monochrome', null, [
    [0, 0],
    [100, 0]
  ]],
  ['red', [-26, 18], [
    [20, 100],
    [30, 92],
    [40, 89],
    [50, 85],
    [60, 78],
    [70, 70],
    [80, 60],
    [90, 55],
    [100, 50]
  ]],
  ['orange', [18, 46], [
    [20, 100],
    [30, 93],
    [40, 88],
    [50, 86],
    [60, 85],
    [70, 70],
    [100, 70]
  ]],
  ['yellow', [46, 62], [
    [25, 100],
    [40, 94],
    [50, 89],
    [60, 86],
    [70, 84],
    [80, 82],
    [90, 80],
    [100, 75]
  ]],
  ['green', [62, 178], [
    [30, 100],
    [40, 90],
    [50, 85],
    [60, 81],
    [70, 74],
    [80, 64],
    [90, 50],
    [100, 40]
  ]],
  ['blue', [178, 257], [
    [20, 100],
    [30, 86],
    [40, 80],
    [50, 74],
    [60, 60],
    [70, 52],
    [80, 44],
    [90, 39],
    [100, 35]
  ]],
  ['purple', [257, 282], [
    [20, 100],
    [30, 87],
    [40, 79],
    [50, 70],
    [60, 65],
    [70, 59],
    [80, 52],
    [90, 45],
    [100, 42]
  ]],
  ['pink', [282, 334], [
    [20, 100],
    [30, 90],
    [40, 86],
    [60, 84],
    [80, 80],
    [90, 75],
    [100, 73]
  ]]
].reduce((memo, dict) => {
  const name = dict[0];
  const hueRange = dict[1];
  const lowerBounds = dict[2];

  const sMin = lowerBounds[0][0];
  const sMax = lowerBounds[lowerBounds.length - 1][0];
  const bMin = lowerBounds[lowerBounds.length - 1][1];
  const bMax = lowerBounds[0][1];

  memo[name] = {
    hueRange,
    lowerBounds,
    saturationRange: [sMin, sMax],
    brightnessRange: [bMin, bMax]
  };

  return memo;
}, {});

function pickHue(options) {
  let hueRange;
  let hue;

  if (colorRanges.length > 0) {
    // hueRange = getRealHueRange(options.hue);
    hueRange = [0, 360];

    hue = randomWithin(hueRange);

    //Each of colorRanges.length ranges has a length equal approximatelly one step
    const step = (hueRange[1] - hueRange[0]) / colorRanges.length;

    let j = parseInt((hue - hueRange[0]) / step);

    //Check if the range j is taken
    if (colorRanges[j] === true) {
      j = (j + 2) % colorRanges.length;
    } else {
      colorRanges[j] = true;
    }

    const min = (hueRange[0] + j * step) % 359;
    const max = (hueRange[0] + (j + 1) * step) % 359;

    hueRange = [min, max];

    hue = randomWithin(hueRange);

    if (hue < 0) {
      hue = 360 + hue;
    }
    return hue;
  } else {
    hueRange = [0, 360];

    hue = randomWithin(hueRange);
    // Instead of storing red as two seperate ranges,
    // we group them, using negative numbers
    if (hue < 0) {
      hue = 360 + hue;
    }

    return hue;
  }
}

function pickSaturation(hue) {
  const { saturationRange } = getColorInfo(hue);
  const sMin = saturationRange[0];
  const sMax = saturationRange[1];
  return randomWithin([sMin, sMax]);
}

function pickBrightness(H, S) {
  const bMin = getMinimumBrightness(H, S);
  const bMax = 100;
  return randomWithin([bMin, bMax]);
}

function getMinimumBrightness(H, S) {
  const lowerBounds = getColorInfo(H).lowerBounds;
  for (let i = 0; i < lowerBounds.length - 1; i++) {
    const s1 = lowerBounds[i][0];
    const v1 = lowerBounds[i][1];
    const s2 = lowerBounds[i + 1][0];
    const v2 = lowerBounds[i + 1][1];
    if (S >= s1 && S <= s2) {
      const m = (v2 - v1) / (s2 - s1);
      const b = v1 - m * s1;
      return m * S + b;
    }
  }

  return 0;
}

function getColorInfo(hue) {
  // Maps red colors to make picking hue easier
  if (hue >= 334 && hue <= 360) {
    hue -= 360;
  }

  for (const colorName in colorDictionary) {
    var color = colorDictionary[colorName];
    if (
      color.hueRange &&
      hue >= color.hueRange[0] &&
      hue <= color.hueRange[1]
    ) {
      return colorDictionary[colorName];
    }
  }
  return 'Color not found';
}

function randomWithin(range) {
  //from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
  const max = range[1] || 1;
  const min = range[0] || 0;
  seed = (seed * 9301 + 49297) % 233280;
  const rnd = seed / 233280.0;
  return Math.floor(min + rnd * (max - min));
}

const round = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

function HSVtoHSL(hsv) {
  const h = hsv[0];
  const s = hsv[1] / 100;
  const v = hsv[2] / 100;
  const k = (2 - s) * v;
  return [
    h,
    Math.round(((s * v) / (k < 1 ? k : 2 - k)) * 10000) / 100,
    round((k / 2) * 100)
  ];
}

function stringToInteger(string) {
  var total = 0;
  for (var i = 0; i !== string.length; i++) {
    if (total >= Number.MAX_SAFE_INTEGER) break;
    total += string.charCodeAt(i);
  }
  return total;
}

// TODO something needs to be fixed here?
// get The range of given hue when options.count!=0
function getRealHueRange(colorHue) {
  if (!isNaN(colorHue)) {
    var number = parseInt(colorHue);

    if (number < 360 && number > 0) {
      return getColorInfo(colorHue).hueRange;
    }
  }
}

// Pass string or array to toColor
// Remove `options` from code and readme
// Pass formatted string or parts of a color as returned output
// Pass `seed` from functions and drop it from global space
// Find out why colors are being duplicated.

function toColor(input, options) {
  options = options || {};

  if (Array.isArray(input)) {
    const colors = [];

    // Value false at index i means the range i is not taken yet.
    input.forEach(str => colorRanges.push(false));

    while (input.length > colors.length) {
      colors.push(toColor(input[colors.length]));
    }

    return colors;
  }

  if (typeof input === 'string') {
    seed = stringToInteger(input);
  } else {
    seed = input;
  }

  const h = pickHue(options);
  const s = pickSaturation(h);
  const b = pickBrightness(h, s);
  return HSVtoHSL([h, s, b]);
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = toColor;
}
