`@mapbox/to-color`
===

Procedurally generate a deterministic, perceptually distributed color palette. Uses [HSLuv](https://www.hsluv.org/) internally for a uniform saturation between palattes.  

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

color.getColor();

// Multiple calls return a new deterministic random color
color.getColor();
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
