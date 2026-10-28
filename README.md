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

Pull Requests merged to `main` with conventional commit prefixes are automatically published to npm by the `NPM release` GitHub Actions workflow, as new major/minor/patch versions (`feat!:`/`feat:`/`fix:` respectively). When using "Squash and merge", ensure your PR title includes the conventional commit prefix; a `BREAKING CHANGE:` footer only counts if it ends up in the squash commit's body. Other prefixes (`chore:`, `docs:`, etc.) or no prefix don't trigger a release.

Examples:
- `fix: resolved issue with seeded colors` -> patch
- `feat: added a new option` -> minor
- `feat!: changed the default palette` (requires consumer changes) -> major

The workflow publishes via [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/) (OIDC), so no npm token is needed. This requires an npm org admin to configure a trusted publisher for `@mapbox/to-color` (GitHub Actions, workflow `npm-release.yml`, environment `npm-release`), and the `npm-release` GitHub Environment to exist in this repository. After publishing, the workflow creates a [GitHub Release](https://github.com/mapbox/to-color/releases) with generated notes and comments the released version on the merged PRs.

Each release also deploys the demo site to GitHub Pages at https://mapbox.github.io/to-color/ (the `gh-pages` branch), so it always matches the latest published version. Prereleases don't deploy it.

`package.json`'s `version` may be incremented manually if needed (for example, to skip a minor version), but you shouldn't normally need to touch it; the published npm version, not `package.json`, is the source of truth for what gets released next.

#### Pre-release versions on other branches

For testing in downstream projects, you can manually trigger the "NPM release" workflow on a branch to publish a pre-release tagged with the short commit sha (e.g. `2.3.1-aa79c6a` when `2.3.0` is the latest release) under the npm `prerelease` dist-tag, without affecting `latest`. Check the workflow results for the published version.

---

**Credit** v2 is adapted from [randomColor](https://github.com/davidmerfield/randomColor).
