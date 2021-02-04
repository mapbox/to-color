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

| Option | Value | Default | Description |
| --- | --- | --- | --- |
| `brightness` | `Number` | `undefined` | Adjusts brightness from the derived min/max range. |
| `saturation` | `Number` | `undefined` | Adjusts saturation from the derived min/max range. |
| `distance` | `Number` | `37` | Adjusts color similarity check. By default, colors should have a euclidean distance of 37 between themselves. **Note:** increasing this value can cause a maximum call stack error as the program recursively tries to find color distances that don't match the value set. |

### Developing

```bash
# Demo site
npm install & npm start

# Run tests
npm run test
```

---

**Credit** v2 is adapted from [randomColor](https://github.com/davidmerfield/randomColor).
