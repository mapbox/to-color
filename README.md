`@mapbox/to-color`
===

Procedurally generate a deterministic, perceptually distributed color palette.

[![Build Status](https://travis-ci.org/mapbox/to-color.svg)](https://travis-ci.org/mapbox/to-color)

### install

```bash
npm install @mapbox/to-color
```

### Usage

```js
import toColor from '@mapbox/to-color'

const color = new toColor('tmcw');

// Or a number
// const color = new toColor(1234);
// Or with options
// const color = new toColor('tmcw', { brightness: 0.25, saturation: 1.1 });

const { hsl } = color.getColor();

/*
Returns

{
  raw: [314, 97.95, 50.98],
  formatted: 'hsl(314, 97.95%, 50.98%)'
}
*/

const { hsl } = color.getColor();

/*
Returns

{
  raw: [2, 78.26, 54],
  formatted: 'hsl(2, 78.26%, 54%)'
}
*/
```

### Options

| Option | Value | Default | Description |
| --- | --- | --- | --- |
| `brightness` | `Number` | 0 | Adjusts brightness percentage from the derived min/max range. |
| `saturation` | `Number` | 0 | Adjusts saturation percentage from the derived min/max range. |
| `limit` | `Array` | `[]` | Limits the higher range of hues for a given color. Options can be `red`, `orange`, `yellow`, `green`, `blue`, `purple`, or `pink`. |

### Developing

```bash
# Demo site
npm install & npm start

# Run tests
npm run test
```

---

**Credit** v2 is adapted from [randomColor](https://github.com/davidmerfield/randomColor).
