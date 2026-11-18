(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.toColor = factory());
})(this, (function () { 'use strict';

  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }

  function define (constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }
  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition) prototype[key] = definition[key];
    return prototype;
  }

  function Color() {}
  var darker = 0.7;
  var brighter = 1 / darker;
  var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
    reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
    reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
    reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
    reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
    reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
  var named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
  };
  define(Color, color, {
    copy(channels) {
      return Object.assign(new this.constructor(), this, channels);
    },
    displayable() {
      return this.rgb().displayable();
    },
    hex: color_formatHex,
    // Deprecated! Use color.formatHex.
    formatHex: color_formatHex,
    formatHex8: color_formatHex8,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });
  function color_formatHex() {
    return this.rgb().formatHex();
  }
  function color_formatHex8() {
    return this.rgb().formatHex8();
  }
  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }
  function color_formatRgb() {
    return this.rgb().formatRgb();
  }
  function color(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
    : l === 3 ? new Rgb(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
    : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
    : l === 4 ? rgba(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) // #f000
    : null // invalid hex
    ) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
    : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
    : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
    : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
    : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
    : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
    : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
    : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
  }
  function rgbn(n) {
    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
  }
  function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }
  function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb();
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }
  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }
  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }
  define(Rgb, rgb, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb() {
      return this;
    },
    clamp() {
      return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
    },
    displayable() {
      return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: rgb_formatHex,
    // Deprecated! Use color.formatHex.
    formatHex: rgb_formatHex,
    formatHex8: rgb_formatHex8,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));
  function rgb_formatHex() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
  }
  function rgb_formatHex8() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
  }
  function rgb_formatRgb() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
  }
  function clampa(opacity) {
    return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
  }
  function clampi(value) {
    return Math.max(0, Math.min(255, Math.round(value) || 0));
  }
  function hex(value) {
    value = clampi(value);
    return (value < 16 ? "0" : "") + value.toString(16);
  }
  function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
  }
  function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl();
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
    if (s) {
      if (r === max) h = (g - b) / s + (g < b) * 6;else if (g === max) h = (b - r) / s + 2;else h = (r - g) / s + 4;
      s /= l < 0.5 ? max + min : 2 - max - min;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }
    return new Hsl(h, s, l, o.opacity);
  }
  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }
  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }
  define(Hsl, hsl, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb() {
      var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
      return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
    },
    clamp() {
      return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
    },
    displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    },
    formatHsl() {
      const a = clampa(this.opacity);
      return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
    }
  }));
  function clamph(value) {
    value = (value || 0) % 360;
    return value < 0 ? value + 360 : value;
  }
  function clampt(value) {
    return Math.max(0, Math.min(1, value || 0));
  }

  /* From FvD 13.37, CSS Color Module Level 3 */
  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
  }

  const radians = Math.PI / 180;
  const degrees = 180 / Math.PI;

  // https://observablehq.com/@mbostock/lab-and-rgb
  const K = 18,
    Xn = 0.96422,
    Yn = 1,
    Zn = 0.82521,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;
  function labConvert(o) {
    if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
    if (o instanceof Hcl) return hcl2lab(o);
    if (!(o instanceof Rgb)) o = rgbConvert(o);
    var r = rgb2lrgb(o.r),
      g = rgb2lrgb(o.g),
      b = rgb2lrgb(o.b),
      y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn),
      x,
      z;
    if (r === g && g === b) x = z = y;else {
      x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
      z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
    }
    return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
  }
  function lab(l, a, b, opacity) {
    return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
  }
  function Lab(l, a, b, opacity) {
    this.l = +l;
    this.a = +a;
    this.b = +b;
    this.opacity = +opacity;
  }
  define(Lab, lab, extend(Color, {
    brighter(k) {
      return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    darker(k) {
      return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    rgb() {
      var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
      x = Xn * lab2xyz(x);
      y = Yn * lab2xyz(y);
      z = Zn * lab2xyz(z);
      return new Rgb(lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z), lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z), lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z), this.opacity);
    }
  }));
  function xyz2lab(t) {
    return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
  }
  function lab2xyz(t) {
    return t > t1 ? t * t * t : t2 * (t - t0);
  }
  function lrgb2rgb(x) {
    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
  }
  function rgb2lrgb(x) {
    return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  }
  function hclConvert(o) {
    if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
    if (!(o instanceof Lab)) o = labConvert(o);
    if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
    var h = Math.atan2(o.b, o.a) * degrees;
    return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
  }
  function hcl(h, c, l, opacity) {
    return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
  }
  function Hcl(h, c, l, opacity) {
    this.h = +h;
    this.c = +c;
    this.l = +l;
    this.opacity = +opacity;
  }
  function hcl2lab(o) {
    if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
    var h = o.h * radians;
    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
  }
  define(Hcl, hcl, extend(Color, {
    brighter(k) {
      return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
    },
    darker(k) {
      return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
    },
    rgb() {
      return hcl2lab(this).rgb();
    }
  }));

  /*
  	CIEDE2000 color difference, original Matlab implementation by Gaurav Sharma
  	Based on "The CIEDE2000 Color-Difference Formula: Implementation Notes, Supplementary Test Data, and Mathematical Observations" 
  	by Gaurav Sharma, Wencheng Wu, Edul N. Dalal in Color Research and Application, vol. 30. No. 1, pp. 21-30, February 2005.
  	http://www2.ece.rochester.edu/~gsharma/ciede2000/
   */

  function differenceCiede2000(kL, kC, kH) {
    kL = kL !== undefined ? kL : 1;
    kC = kC !== undefined ? kC : 1;
    kH = kH !== undefined ? kH : 1;
    return function (std, smp) {
      var LabStd = lab(std);
      var LabSmp = lab(smp);
      var lStd = LabStd.l;
      var aStd = LabStd.a;
      var bStd = LabStd.b;
      var cStd = Math.sqrt(aStd * aStd + bStd * bStd);
      var lSmp = LabSmp.l;
      var aSmp = LabSmp.a;
      var bSmp = LabSmp.b;
      var cSmp = Math.sqrt(aSmp * aSmp + bSmp * bSmp);
      var cAvg = (cStd + cSmp) / 2;
      var G = 0.5 * (1 - Math.sqrt(Math.pow(cAvg, 7) / (Math.pow(cAvg, 7) + Math.pow(25, 7))));
      var apStd = aStd * (1 + G);
      var apSmp = aSmp * (1 + G);
      var cpStd = Math.sqrt(apStd * apStd + bStd * bStd);
      var cpSmp = Math.sqrt(apSmp * apSmp + bSmp * bSmp);
      var hpStd = Math.abs(apStd) + Math.abs(bStd) === 0 ? 0 : Math.atan2(bStd, apStd);
      hpStd += (hpStd < 0) * 2 * Math.PI;
      var hpSmp = Math.abs(apSmp) + Math.abs(bSmp) === 0 ? 0 : Math.atan2(bSmp, apSmp);
      hpSmp += (hpSmp < 0) * 2 * Math.PI;
      var dL = lSmp - lStd;
      var dC = cpSmp - cpStd;
      var dhp = cpStd * cpSmp === 0 ? 0 : hpSmp - hpStd;
      dhp -= (dhp > Math.PI) * 2 * Math.PI;
      dhp += (dhp < -Math.PI) * 2 * Math.PI;
      var dH = 2 * Math.sqrt(cpStd * cpSmp) * Math.sin(dhp / 2);
      var Lp = (lStd + lSmp) / 2;
      var Cp = (cpStd + cpSmp) / 2;
      var hp;
      if (cpStd * cpSmp === 0) {
        hp = hpStd + hpSmp;
      } else {
        hp = (hpStd + hpSmp) / 2;
        hp -= (Math.abs(hpStd - hpSmp) > Math.PI) * Math.PI;
        hp += (hp < 0) * 2 * Math.PI;
      }
      var Lpm50 = Math.pow(Lp - 50, 2);
      var T = 1 - 0.17 * Math.cos(hp - Math.PI / 6) + 0.24 * Math.cos(2 * hp) + 0.32 * Math.cos(3 * hp + Math.PI / 30) - 0.2 * Math.cos(4 * hp - 63 * Math.PI / 180);
      var Sl = 1 + 0.015 * Lpm50 / Math.sqrt(20 + Lpm50);
      var Sc = 1 + 0.045 * Cp;
      var Sh = 1 + 0.015 * Cp * T;
      var deltaTheta = 30 * Math.PI / 180 * Math.exp(-1 * Math.pow((180 / Math.PI * hp - 275) / 25, 2));
      var Rc = 2 * Math.sqrt(Math.pow(Cp, 7) / (Math.pow(Cp, 7) + Math.pow(25, 7)));
      var Rt = -1 * Math.sin(2 * deltaTheta) * Rc;
      return Math.sqrt(Math.pow(dL / (kL * Sl), 2) + Math.pow(dC / (kC * Sc), 2) + Math.pow(dH / (kH * Sh), 2) + Rt * dC / (kC * Sc) * dH / (kH * Sh));
    };
  }
  var differenceCiede2000Default = differenceCiede2000();

  class Hsluv {
    constructor() {
      // RGB
      this.hex = '#000000';
      this.rgb_r = 0;
      this.rgb_g = 0;
      this.rgb_b = 0;
      // CIE XYZ
      this.xyz_x = 0;
      this.xyz_y = 0;
      this.xyz_z = 0;
      // CIE LUV
      this.luv_l = 0;
      this.luv_u = 0;
      this.luv_v = 0;
      // CIE LUV LCh
      this.lch_l = 0;
      this.lch_c = 0;
      this.lch_h = 0;
      // HSLuv
      this.hsluv_h = 0;
      this.hsluv_s = 0;
      this.hsluv_l = 0;
      // HPLuv
      this.hpluv_h = 0;
      this.hpluv_p = 0;
      this.hpluv_l = 0;
      // 6 lines in slope-intercept format: R < 0, R > 1, G < 0, G > 1, B < 0, B > 1
      this.r0s = 0;
      this.r0i = 0;
      this.r1s = 0;
      this.r1i = 0;
      this.g0s = 0;
      this.g0i = 0;
      this.g1s = 0;
      this.g1i = 0;
      this.b0s = 0;
      this.b0i = 0;
      this.b1s = 0;
      this.b1i = 0;
    }
    static fromLinear(c) {
      if (c <= 0.0031308) {
        return 12.92 * c;
      } else {
        return 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
      }
    }
    static toLinear(c) {
      if (c > 0.04045) {
        return Math.pow((c + 0.055) / 1.055, 2.4);
      } else {
        return c / 12.92;
      }
    }
    static yToL(Y) {
      if (Y <= Hsluv.epsilon) {
        return Y / Hsluv.refY * Hsluv.kappa;
      } else {
        return 116 * Math.pow(Y / Hsluv.refY, 1 / 3) - 16;
      }
    }
    static lToY(L) {
      if (L <= 8) {
        return Hsluv.refY * L / Hsluv.kappa;
      } else {
        return Hsluv.refY * Math.pow((L + 16) / 116, 3);
      }
    }
    static rgbChannelToHex(chan) {
      const c = Math.round(chan * 255);
      const digit2 = c % 16;
      const digit1 = (c - digit2) / 16 | 0;
      return Hsluv.hexChars.charAt(digit1) + Hsluv.hexChars.charAt(digit2);
    }
    static hexToRgbChannel(hex, offset) {
      const digit1 = Hsluv.hexChars.indexOf(hex.charAt(offset));
      const digit2 = Hsluv.hexChars.indexOf(hex.charAt(offset + 1));
      const n = digit1 * 16 + digit2;
      return n / 255.0;
    }
    static distanceFromOriginAngle(slope, intercept, angle) {
      const d = intercept / (Math.sin(angle) - slope * Math.cos(angle));
      if (d < 0) {
        return Infinity;
      } else {
        return d;
      }
    }
    static distanceFromOrigin(slope, intercept) {
      return Math.abs(intercept) / Math.sqrt(Math.pow(slope, 2) + 1);
    }
    static min6(f1, f2, f3, f4, f5, f6) {
      return Math.min(f1, Math.min(f2, Math.min(f3, Math.min(f4, Math.min(f5, f6)))));
    }
    rgbToHex() {
      this.hex = "#";
      this.hex += Hsluv.rgbChannelToHex(this.rgb_r);
      this.hex += Hsluv.rgbChannelToHex(this.rgb_g);
      this.hex += Hsluv.rgbChannelToHex(this.rgb_b);
    }
    hexToRgb() {
      this.hex = this.hex.toLowerCase();
      this.rgb_r = Hsluv.hexToRgbChannel(this.hex, 1);
      this.rgb_g = Hsluv.hexToRgbChannel(this.hex, 3);
      this.rgb_b = Hsluv.hexToRgbChannel(this.hex, 5);
    }
    xyzToRgb() {
      this.rgb_r = Hsluv.fromLinear(Hsluv.m_r0 * this.xyz_x + Hsluv.m_r1 * this.xyz_y + Hsluv.m_r2 * this.xyz_z);
      this.rgb_g = Hsluv.fromLinear(Hsluv.m_g0 * this.xyz_x + Hsluv.m_g1 * this.xyz_y + Hsluv.m_g2 * this.xyz_z);
      this.rgb_b = Hsluv.fromLinear(Hsluv.m_b0 * this.xyz_x + Hsluv.m_b1 * this.xyz_y + Hsluv.m_b2 * this.xyz_z);
    }
    rgbToXyz() {
      const lr = Hsluv.toLinear(this.rgb_r);
      const lg = Hsluv.toLinear(this.rgb_g);
      const lb = Hsluv.toLinear(this.rgb_b);
      this.xyz_x = 0.41239079926595 * lr + 0.35758433938387 * lg + 0.18048078840183 * lb;
      this.xyz_y = 0.21263900587151 * lr + 0.71516867876775 * lg + 0.072192315360733 * lb;
      this.xyz_z = 0.019330818715591 * lr + 0.11919477979462 * lg + 0.95053215224966 * lb;
    }
    xyzToLuv() {
      const divider = this.xyz_x + 15 * this.xyz_y + 3 * this.xyz_z;
      let varU = 4 * this.xyz_x;
      let varV = 9 * this.xyz_y;
      if (divider !== 0) {
        varU /= divider;
        varV /= divider;
      } else {
        varU = NaN;
        varV = NaN;
      }
      this.luv_l = Hsluv.yToL(this.xyz_y);
      if (this.luv_l === 0) {
        this.luv_u = 0;
        this.luv_v = 0;
      } else {
        this.luv_u = 13 * this.luv_l * (varU - Hsluv.refU);
        this.luv_v = 13 * this.luv_l * (varV - Hsluv.refV);
      }
    }
    luvToXyz() {
      if (this.luv_l === 0) {
        this.xyz_x = 0;
        this.xyz_y = 0;
        this.xyz_z = 0;
        return;
      }
      const varU = this.luv_u / (13 * this.luv_l) + Hsluv.refU;
      const varV = this.luv_v / (13 * this.luv_l) + Hsluv.refV;
      this.xyz_y = Hsluv.lToY(this.luv_l);
      this.xyz_x = 0 - 9 * this.xyz_y * varU / ((varU - 4) * varV - varU * varV);
      this.xyz_z = (9 * this.xyz_y - 15 * varV * this.xyz_y - varV * this.xyz_x) / (3 * varV);
    }
    luvToLch() {
      this.lch_l = this.luv_l;
      this.lch_c = Math.sqrt(this.luv_u * this.luv_u + this.luv_v * this.luv_v);
      if (this.lch_c < 0.00000001) {
        this.lch_h = 0;
      } else {
        const hrad = Math.atan2(this.luv_v, this.luv_u);
        this.lch_h = hrad * 180.0 / Math.PI;
        if (this.lch_h < 0) {
          this.lch_h = 360 + this.lch_h;
        }
      }
    }
    lchToLuv() {
      const hrad = this.lch_h / 180.0 * Math.PI;
      this.luv_l = this.lch_l;
      this.luv_u = Math.cos(hrad) * this.lch_c;
      this.luv_v = Math.sin(hrad) * this.lch_c;
    }
    calculateBoundingLines(l) {
      const sub1 = Math.pow(l + 16, 3) / 1560896;
      const sub2 = sub1 > Hsluv.epsilon ? sub1 : l / Hsluv.kappa;
      const s1r = sub2 * (284517 * Hsluv.m_r0 - 94839 * Hsluv.m_r2);
      const s2r = sub2 * (838422 * Hsluv.m_r2 + 769860 * Hsluv.m_r1 + 731718 * Hsluv.m_r0);
      const s3r = sub2 * (632260 * Hsluv.m_r2 - 126452 * Hsluv.m_r1);
      const s1g = sub2 * (284517 * Hsluv.m_g0 - 94839 * Hsluv.m_g2);
      const s2g = sub2 * (838422 * Hsluv.m_g2 + 769860 * Hsluv.m_g1 + 731718 * Hsluv.m_g0);
      const s3g = sub2 * (632260 * Hsluv.m_g2 - 126452 * Hsluv.m_g1);
      const s1b = sub2 * (284517 * Hsluv.m_b0 - 94839 * Hsluv.m_b2);
      const s2b = sub2 * (838422 * Hsluv.m_b2 + 769860 * Hsluv.m_b1 + 731718 * Hsluv.m_b0);
      const s3b = sub2 * (632260 * Hsluv.m_b2 - 126452 * Hsluv.m_b1);
      this.r0s = s1r / s3r;
      this.r0i = s2r * l / s3r;
      this.r1s = s1r / (s3r + 126452);
      this.r1i = (s2r - 769860) * l / (s3r + 126452);
      this.g0s = s1g / s3g;
      this.g0i = s2g * l / s3g;
      this.g1s = s1g / (s3g + 126452);
      this.g1i = (s2g - 769860) * l / (s3g + 126452);
      this.b0s = s1b / s3b;
      this.b0i = s2b * l / s3b;
      this.b1s = s1b / (s3b + 126452);
      this.b1i = (s2b - 769860) * l / (s3b + 126452);
    }
    calcMaxChromaHpluv() {
      const r0 = Hsluv.distanceFromOrigin(this.r0s, this.r0i);
      const r1 = Hsluv.distanceFromOrigin(this.r1s, this.r1i);
      const g0 = Hsluv.distanceFromOrigin(this.g0s, this.g0i);
      const g1 = Hsluv.distanceFromOrigin(this.g1s, this.g1i);
      const b0 = Hsluv.distanceFromOrigin(this.b0s, this.b0i);
      const b1 = Hsluv.distanceFromOrigin(this.b1s, this.b1i);
      return Hsluv.min6(r0, r1, g0, g1, b0, b1);
    }
    calcMaxChromaHsluv(h) {
      const hueRad = h / 360 * Math.PI * 2;
      const r0 = Hsluv.distanceFromOriginAngle(this.r0s, this.r0i, hueRad);
      const r1 = Hsluv.distanceFromOriginAngle(this.r1s, this.r1i, hueRad);
      const g0 = Hsluv.distanceFromOriginAngle(this.g0s, this.g0i, hueRad);
      const g1 = Hsluv.distanceFromOriginAngle(this.g1s, this.g1i, hueRad);
      const b0 = Hsluv.distanceFromOriginAngle(this.b0s, this.b0i, hueRad);
      const b1 = Hsluv.distanceFromOriginAngle(this.b1s, this.b1i, hueRad);
      return Hsluv.min6(r0, r1, g0, g1, b0, b1);
    }
    hsluvToLch() {
      if (this.hsluv_l > 99.9999999) {
        this.lch_l = 100;
        this.lch_c = 0;
      } else if (this.hsluv_l < 0.00000001) {
        this.lch_l = 0;
        this.lch_c = 0;
      } else {
        this.lch_l = this.hsluv_l;
        this.calculateBoundingLines(this.hsluv_l);
        const max = this.calcMaxChromaHsluv(this.hsluv_h);
        this.lch_c = max / 100 * this.hsluv_s;
      }
      this.lch_h = this.hsluv_h;
    }
    lchToHsluv() {
      if (this.lch_l > 99.9999999) {
        this.hsluv_s = 0;
        this.hsluv_l = 100;
      } else if (this.lch_l < 0.00000001) {
        this.hsluv_s = 0;
        this.hsluv_l = 0;
      } else {
        this.calculateBoundingLines(this.lch_l);
        const max = this.calcMaxChromaHsluv(this.lch_h);
        this.hsluv_s = this.lch_c / max * 100;
        this.hsluv_l = this.lch_l;
      }
      this.hsluv_h = this.lch_h;
    }
    hpluvToLch() {
      if (this.hpluv_l > 99.9999999) {
        this.lch_l = 100;
        this.lch_c = 0;
      } else if (this.hpluv_l < 0.00000001) {
        this.lch_l = 0;
        this.lch_c = 0;
      } else {
        this.lch_l = this.hpluv_l;
        this.calculateBoundingLines(this.hpluv_l);
        const max = this.calcMaxChromaHpluv();
        this.lch_c = max / 100 * this.hpluv_p;
      }
      this.lch_h = this.hpluv_h;
    }
    lchToHpluv() {
      if (this.lch_l > 99.9999999) {
        this.hpluv_p = 0;
        this.hpluv_l = 100;
      } else if (this.lch_l < 0.00000001) {
        this.hpluv_p = 0;
        this.hpluv_l = 0;
      } else {
        this.calculateBoundingLines(this.lch_l);
        const max = this.calcMaxChromaHpluv();
        this.hpluv_p = this.lch_c / max * 100;
        this.hpluv_l = this.lch_l;
      }
      this.hpluv_h = this.lch_h;
    }
    hsluvToRgb() {
      this.hsluvToLch();
      this.lchToLuv();
      this.luvToXyz();
      this.xyzToRgb();
    }
    hpluvToRgb() {
      this.hpluvToLch();
      this.lchToLuv();
      this.luvToXyz();
      this.xyzToRgb();
    }
    hsluvToHex() {
      this.hsluvToRgb();
      this.rgbToHex();
    }
    hpluvToHex() {
      this.hpluvToRgb();
      this.rgbToHex();
    }
    rgbToHsluv() {
      this.rgbToXyz();
      this.xyzToLuv();
      this.luvToLch();
      this.lchToHpluv();
      this.lchToHsluv();
    }
    rgbToHpluv() {
      this.rgbToXyz();
      this.xyzToLuv();
      this.luvToLch();
      this.lchToHpluv();
      this.lchToHpluv();
    }
    hexToHsluv() {
      this.hexToRgb();
      this.rgbToHsluv();
    }
    hexToHpluv() {
      this.hexToRgb();
      this.rgbToHpluv();
    }
  }
  Hsluv.hexChars = "0123456789abcdef";
  Hsluv.refY = 1.0;
  Hsluv.refU = 0.19783000664283;
  Hsluv.refV = 0.46831999493879;
  Hsluv.kappa = 903.2962962;
  Hsluv.epsilon = 0.0088564516;
  Hsluv.m_r0 = 3.240969941904521;
  Hsluv.m_r1 = -1.537383177570093;
  Hsluv.m_r2 = -0.498610760293;
  Hsluv.m_g0 = -0.96924363628087;
  Hsluv.m_g1 = 1.87596750150772;
  Hsluv.m_g2 = 0.041555057407175;
  Hsluv.m_b0 = 0.055630079696993;
  Hsluv.m_b1 = -0.20397695888897;
  Hsluv.m_b2 = 1.056971514242878;

  var toColor = /*#__PURE__*/function () {
    function toColor(seed, options) {
      var _this = this;
      _classCallCheck(this, toColor);
      _defineProperty(this, "HUE_MAX", 360);
      // HSLuv hue ranges. Each covers the full saturation/lightness spread of
      // its color so neighbors overlap. Red wraps around 0, so it starts negative.
      _defineProperty(this, "hues", {
        red: [-20, 34],
        orange: [18, 71],
        yellow: [59, 89],
        green: [86, 190],
        blue: [185, 277],
        purple: [268, 295],
        pink: [285, 360]
      });
      _defineProperty(this, "_clamp", function (n, min, max) {
        return n <= min ? min : n >= max ? max : n;
      });
      _defineProperty(this, "_colorWithModifiers", function (h, s, l) {
        var percentage = function percentage(n, per) {
          return n / 100 * per * 100;
        };
        var _this$options = _this.options,
          brightness = _this$options.brightness,
          saturation = _this$options.saturation;

        // Modify brightness/saturation if provided
        s = saturation ? _this._clamp(percentage(saturation, s), 0, 100) : s;
        l = brightness ? _this._clamp(percentage(brightness, l), 0, 100) : l;
        return _this._HSLuvify(h, s, l);
      });
      _defineProperty(this, "_HSLuvify", function (h, s, l) {
        var conv = new Hsluv();
        conv.hsluv_h = h;
        conv.hsluv_s = s;
        conv.hsluv_l = l;
        conv.hsluvToHex();
        var c = color(conv.hex);
        var raw = hsl(c);

        // Convert and round
        var hRounded = Math.round(_this._clamp(raw.h || 0, 0, 360));
        var sRounded = Math.round(_this._clamp((raw.s || 0) * 100, 0, 100));
        var lRounded = Math.round(_this._clamp(raw.l * 100, 0, 100));
        return {
          hsl: {
            raw: [hRounded, sRounded, lRounded],
            formatted: "hsl(".concat(hRounded, ", ").concat(sRounded, "%, ").concat(lRounded, "%)")
          }
        };
      });
      _defineProperty(this, "_pickHue", function () {
        var hue = _this._pseudoRandom([0, _this.HUE_MAX]);
        var min = hue % _this.HUE_MAX;
        var max = (hue + 1) % _this.HUE_MAX;
        hue = _this._pseudoRandom([min, max]);

        // Limit the max of some hues if the option is passed.
        var limit = _this.options.limit;
        if (limit && limit.length) {
          var _loop = function _loop() {
              var _this$hues;
              var hueRange = (_this$hues = _this.hues) === null || _this$hues === void 0 ? void 0 : _this$hues[limit[i]];
              if (hueRange && [hue, hue - _this.HUE_MAX].some(function (h) {
                return h > hueRange[0] && h <= hueRange[1];
              })) {
                return {
                  v: _this._pickHue()
                };
              }
            },
            _ret;
          for (var i = 0; i !== limit.length; i++) {
            _ret = _loop();
            if (_ret) return _ret.v;
          }
        }
        return hue;
      });
      _defineProperty(this, "_pickSaturation", function () {
        // HSLuv saturation can be high without RGB clipping, so keep near upper range
        return _this._pseudoRandom([60, 100]);
      });
      _defineProperty(this, "_pickLightness", function () {
        // Avoid extremes for better contrast
        return _this._pseudoRandom([35, 80]);
      });
      // A linear congruential generator (LCG) algorithm that yields a sequence of
      // pseudo-randomized numbers calculated with a discontinuous piecewise linear
      // equation. see: indiegamr.com/generate-repeatable-random-numbers-in-js
      _defineProperty(this, "_pseudoRandom", function (range) {
        var max = range[1] || 1;
        var min = range[0] || 0;
        _this.seed = (_this.seed * 9301 + 49297) % 233280;
        var rnd = _this.seed / 233280;
        return Math.trunc(min + rnd * (max - min));
      });
      _defineProperty(this, "_stringToInteger", function (string) {
        var total = 0;
        for (var i = 0; i !== string.length; i++) {
          if (total >= Number.MAX_SAFE_INTEGER) break;
          total += string.charCodeAt(i);
        }
        return total;
      });
      this.options = options || {};
      if (typeof seed === 'string' || typeof seed === 'number') {
        this.rootSeed = typeof seed === 'string' ? this._stringToInteger(seed) : seed;
      } else {
        throw new TypeError('Seed value must be a number or string');
      }
      this.seed = this.rootSeed;
      this.known = [];
      this.cache = new Map();
    }
    return _createClass(toColor, [{
      key: "getColor",
      value: function getColor(key) {
        if (typeof key === 'string') {
          if (this.cache.has(key)) return this.cache.get(key);
          var _color = this._getDeterministicColor(key);
          this.cache.set(key, _color);
          return _color;
        }
        return this._getSequentialColor();
      }
    }, {
      key: "_getDeterministicColor",
      value: function _getDeterministicColor(key) {
        var combined = this._stringToInteger("".concat(this.rootSeed, ":").concat(key));
        var h = this._mapIndexToHue(combined);
        var s = this._mapIndexToRange(combined >> 2, 60, 100);
        var l = this._mapIndexToRange(combined >> 3, 35, 80);
        return this._colorWithModifiers(h, s, l);
      }
    }, {
      key: "_getSequentialColor",
      value: function _getSequentialColor() {
        var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var h = this._pickHue();
        var s = this._pickSaturation();
        var l = this._pickLightness();
        var _this$_HSLuvify = this._HSLuvify(h, s, l),
          hsl = _this$_HSLuvify.hsl;
        var PASSABLE_DISTANCE = 60;
        var ACTUAL_DISTANCE = PASSABLE_DISTANCE / Math.pow(1.05, count);
        if (this.known.length && this.known.some(function (v) {
          return differenceCiede2000Default(v, hsl.formatted) < ACTUAL_DISTANCE;
        })) {
          return this._getSequentialColor(count + 1);
        } else {
          this.known.push(hsl.formatted);
          return this._colorWithModifiers(h, s, l);
        }
      }
    }, {
      key: "_mapIndexToHue",
      value: function _mapIndexToHue(index) {
        // A hybrid approach to color distance checking in _getSequentialColor but
        // for `_getDeterministicColor`. Attempts to “spread” hash values evenly to
        // reduce the same hues appearing next to one another.
        var GOLDEN_RATIO_CONJUGATE = (Math.sqrt(5) - 1) / 2; // ≈ 0.61803398875
        return Math.round(index * GOLDEN_RATIO_CONJUGATE % 1 * this.HUE_MAX);
      }
    }, {
      key: "_mapIndexToRange",
      value: function _mapIndexToRange(index, min, max) {
        return min + index % (max - min);
      }
    }]);
  }();

  return toColor;

}));
//# sourceMappingURL=to-color.js.map
