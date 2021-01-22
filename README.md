`@mapboc/to-color`
---

Generate a consistent random color from an arbitrary string. Pass previously known colors to generate a harmonious palette.

[![build status](https://secure.travis-ci.org/mapbox/to-color.svg)](http://travis-ci.org/mapbox/to-color)

### install

    npm install @mapbox/to-color

### Usage

```js
import toColor from '@mapbox/to-color'

toColor('tom');
// Returns { rgb: [ 187, 153, 68 ] }

toColor('tom', { known: ['rgb(187, 153, 68)'] })
// Returns { rgb: [] }

```

### Options

| Option | Type | Description |
| --- | --- | --- |
| `known` | Array<string> | A list of known color values that should be taken into consideration for distribution when generating a random color |

---

**Credit** v2 is adapted from [randomColor](https://github.com/davidmerfield/randomColor) with a different API, reduced options, and the ability to pass known colors to generate a distributed random set.


### Developing

```

# Demo site
npm install & npm start

# Run tests
npm run test

```
