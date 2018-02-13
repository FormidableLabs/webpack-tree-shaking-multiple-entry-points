## Webpack + Tree Shaking + Multiple Entry Points

### Summary

Webpack correctly drops unused ESnext imports for multiple entry points when
they are in completely different configuration objects, but when multiple
entry points are within a single `entry:` configuration, any ESnext exports
imported by **any** of the entry points are imported by **all** the entry
points.

### Reproduction steps

```sh
$ yarn install
$ yarn build
$ yarn test
```

Test output:

```
  tree shaking in webpack4
    array
      one-file
        ✓ app1 should have red, not blue
        ✓ app2 should have blue, not red
      re-export
        ✓ app1 should have red, not blue
        ✓ app2 should have blue, not red
    multiple-entries
      one-file
        1) app1 should have red, not blue
        2) app2 should have blue, not red
      re-export
        3) app1 should have red, not blue
        4) app2 should have blue, not red


  4 passing (22ms)
  4 failing
```

### A Little More Depth

The [`src`](src) directory contains two "scenarios" -- `one-file` (named exports
from a single file) and `re-export` (named re-exports from further files). Each
scenario has two apps, `app1.js` which uses a common imported `red` function and
`app2.js` which uses a common imported `blue` function.

**Expectation**: Webpack should produce bundles for each app without the unused
function.

**Actual - Arrays**: (WORKS)

A configuration of arrays like [`webpack.config.arrays.js`](webpack.config.arrays.js)

```js
const SCENARIOS = ["one-file", "re-export"];
const ENTRY_POINTS = ["app1", "app2"];

module.exports = SCENARIOS
  .map((scenario) => ENTRY_POINTS.map((entryName) => ({
    entry: {
      [entryName]: "./" + entryName + ".js"
    },
  })))
  // Flatten
  .reduce((m, c) => m.concat(c), []);
```

works and drops the unused functions.

Output bundles at: [`dist/array`](dist/array)

**Actual - Multiple Entry Points**: (FAILS)

A single configuration object with multiple entry points like [`webpack.config.multiple-entries.js`](webpack.config.multiple-entries.js)

```js
const SCENARIOS = ["one-file", "re-export"];

module.exports = SCENARIOS.map((scenario) => ({
  entry: {
    app1: "./app1.js",
    app2: "./app2.js"
  }
}));
```

does not work. `red` and `blue` are included in **both** `app1` and `app2`
bundles.

Output bundles at: [`dist/multiple-entries`](dist/multiple-entries)
