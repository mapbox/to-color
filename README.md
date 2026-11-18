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

`getColor` can optionally take a seed to guarantee the same random color regardless of order.

```js
import toColor from '@mapbox/to-color'

const color = new toColor('trees');

color.getColor('cedar'); // Returns a random color based on `trees`
color.getColor('birch'); 
color.getColor('cedar'); // Returns the same color for cedar
color.getColor('spruce');
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

### Publishing

Pull Requests to `main` automatically publish a new version based on the PR's title prefix (`major:`, `minor:` or `patch:`) to the npmjs registry.

Each release also deploys the demo site to GitHub Pages at https://mapbox.github.io/to-color/ (the `gh-pages` branch). Prereleases don't deploy it.

The published version in the registry is the source of truth for the package version, but you can manually increment the `package.json`'s `version`.

#### Pre-release versions on other branches

For testing in downstream projects, you can manually trigger the "NPM release" workflow on a branch to publish a pre-release tagged with the short commit sha (e.g. `2.3.1-aa79c6a` when `2.3.0` is the latest release) under the npm `prerelease` dist-tag, without affecting `latest`. Check the workflow results for the published version.

---

**Credit** v2 is adapted from [randomColor](https://github.com/davidmerfield/randomColor).
