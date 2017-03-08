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
  multiple entries + tree shaking issues
    array of configurations correctly eliminates unused code
      ✓ app1 should drop blue, keep red
      ✓ app2 should drop red, keep blue
    multiple entries should eliminate unused code (FAILS)
      1) app1 should drop blue, keep red
      2) app2 should drop red, keep blue


  2 passing (73ms)
  2 failing
```

### A Little More Depth

The [`src`](src) directory contains two apps, `app1.js` which uses a common
imported `red` function and `app2.js` which uses a common imported `blue`
function.

**Expectation**: Webpack should produce bundles for each app without the unused
function.

**Actual - Arrays**: (WORKS)

A configuration of arrays like [`webpack.config.arrays.js`](webpack.config.arrays.js)

```js
var ENTRY_POINTS = ["app1", "app2"];

module.exports = ENTRY_POINTS.map(function (entryName) {
  var entry = {};
  entry[entryName] = "./" + entryName + ".js";

  return {
    context: path.join(__dirname, "src"),
    entry: entry,
    // ... OTHER STUFF ...
  };
});
```

works and drops the unused functions.

Output bundles at: [`dist/array`](dist/array)

**Actual - Multiple Entry Points**: (FAILS)

A single configuration object with multiple entry points like [`webpack.config.multiple-entries.js`](webpack.config.multiple-entries.js)

```js
module.exports = {
  context: path.join(__dirname, "src"),
  entry: {
    app1: "./app1.js",
    app2: "./app2.js"
  },
  // ... OTHER STUFF ...
};
```

does not work. `red` and `blue` are included in **both** `app1` and `app2`
bundles.

Output bundles at: [`dist/multiple-entries`](dist/multiple-entries)
