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
