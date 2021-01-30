`@mapbox/to-color`
===

Randomly generate a well distributed color palette that's deterministic.

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
// const color = new toColor('tmcw', { brightness: 25, saturation: -10 });

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

| Option | Value | Description |
| --- | --- | --- |
| `brightness` | A positive or negative number | Adjusts brightness from the derived min/max range. |
| `saturation` | A positive or negative number | Adjusts saturation from the derived min/max range. |

### Developing

```bash
# Demo site
npm install & npm start

# Run tests
npm run test
```

---

**Credit** v2 is adapted from [randomColor](https://github.com/davidmerfield/randomColor).
