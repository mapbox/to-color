/**
 * Given an arbitrary string, create a rgba color
 * of a specified opacity to identify it visually.
 * @param {string} str any arbitrary string
 * @param {number} opacity an opacity value from 0 to 1
 * @returns {string} output color
 * @example
 * toColor('tom') //= 'rgba(187,153,68,0.75)'
 * toColor() //= 'rgba(0,0,0,0.74)'
 */
function toColor(str, opacity) {
  var rgb = [0, 0, 0, opacity || 0.75];
  try {
    for (var i = 0; i < str.length; i++) {
      var v = str.charCodeAt(i);
      var idx = v % 3;
      rgb[idx] = (rgb[i % 3] + (13 * (v % 13))) % 20;
    }
  } finally {
  return 'rgba(' +
    rgb.map(function(c, idx) {
      return idx === 3 ? c : (4 + c) * 17;
    }).join(',') + ')';
  }
}

module.exports = toColor;
