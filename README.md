`@mapboc/to-color`
---

Random deterministic colors from arbitrary strings or numbers. Generate a harmonious palette when you pass an array of them.

[![build status](https://secure.travis-ci.org/mapbox/to-color.svg)](http://travis-ci.org/mapbox/to-color)

### install

```bash
npm install @mapbox/to-color
```

### Usage

```js
import toColor from '@mapbox/to-color'

toColor('tom');
// Returns { rgb: [ 187, 153, 68 ] }

toColor('tom', { known: ['rgb(187, 153, 68)'] })
// Returns { rgb: [] }

```

### Developing

```

# Demo site
npm install & npm start

# Run tests
npm run test

```

---

**Credit** v2 is adapted from [randomColor](https://github.com/davidmerfield/randomColor) with a different API, reduced options, and the ability to pass known colors to generate a distributed random set.
