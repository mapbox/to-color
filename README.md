`@mapbox/to-color`
===

Random deterministic colors from arbitrary strings or numbers. Generate a harmonious palette when you pass an array of them.

[![build status](https://secure.travis-ci.org/mapbox/to-color.svg)](http://travis-ci.org/mapbox/to-color)

### install

```bash
npm install @mapbox/to-color
```

### Usage

```js
import toColor from '@mapbox/to-color'

const { hsl } = toColor('tom');
/*
Returns

{
  raw: [218, 81.43, 62.31],
  formatted: 'hsl(218, 81.43%, 62.31%)'
}
*/

toColor(['tom', 'tmcw']);

/*
Returns

[
  {
    raw: [77, 97.78, 54.94],
    formatted: 'hsl(77, 97.78%, 54.94%)'
  },
  {
    raw: [176, 97.96, 50.99],
    formatted: 'hsl(176, 97.96%, 50.99%)'
  }
]
*/
```

### Options

| Option | Value | Description |
| --- | --- | --- |
| `brightness` | A positive or negative number | Adjusts brightness from the derived min/max range. |
| `saturation` | A positive or negative number | Adjusts saturation from the derived min/max range. |

### Developing

```
# Demo site
npm install & npm start

# Run tests
npm run test

```

---

**Credit** v2 is adapted from [randomColor](https://github.com/davidmerfield/randomColor) with a different API, reduced options, and the ability to pass known colors to generate a distributed random set.
