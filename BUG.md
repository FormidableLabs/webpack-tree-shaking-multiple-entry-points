<!-- Please don't delete this template or we'll close your issue -->
<!-- Before creating an issue please make sure you are using the latest version of webpack. -->
<!-- Also consider trying the webpack@beta version, maybe it's already fixed. -->

**Do you want to request a *feature* or report a *bug*?**

Bug.

<!-- Please ask questions on StackOverflow or the webpack Gitter (https://gitter.im/webpack/webpack). -->
<!-- Issues which contain questions or support requests will be closed. -->

**What is the current behavior?**

By way of example, I have:

- `util.js`: ES exports two methods: `red` and `blue`
- `app1.js`: Imports and uses only `red`
- `app2.js`: Imports and uses only `blue`

_Expected_: If I build webpack bundles for both apps, `app1` will have `red` and `blue` will be eliminated. Conversely, `app2` will have `blue` and `red` will be eliminated:

_Actual_: Depends on config

1. _Array of Configs_: If there is an array of configurations with a single entry point each for `app1.js` and `app2.js` the correct unused methods are dropped.
2. _Multiple Entry Points_: If there is a single configuration object with multiple entry points for both `app1.js` and `app2.js`, then **neither `blue` nor `red` are eliminated in either bundle**. I would consider this a bug. Perhaps there is some known thing for "multiple entry points get any esnext exports used by _any_ other entry point", but that seems weird.

**If the current behavior is a bug, please provide the steps to reproduce.**

<!-- A great way to do this is to provide your configuration via a GitHub gist. -->
<!-- Best provide a minimal reproduceable repo -->
<!-- If your issue is caused by a plugin or loader file the issue on the plugin/loader repo -->

We made a repository with passing and failing mocha tests to show the situation: https://github.com/FormidableLabs/webpack-tree-shaking-multiple-entry-points.

_Reproduction_:

```sh
$ git clone https://github.com/FormidableLabs/webpack-tree-shaking-multiple-entry-points.git
$ cd webpack-tree-shaking-multiple-entry-points
$ yarn install
$ yarn run build
$ yarn run test
```

The test output is:

```
  multiple entries + tree shaking issues
    array of configurations correctly eliminates unused code
      ✓ app1 should drop blue, keep red
      ✓ app2 should drop red, keep blue
    multiple entries should eliminate unused code (FAILS)
      1) app1 should drop blue, keep red
      2) app2 should drop red, keep blue


  2 passing (80ms)
  2 failing
```

The two failing ones show that the ES methods that should be dropped aren't.

**What is the expected behavior?**

See above section on `current behavior`.

**If this is a feature request, what is motivation or use case for changing the behavior?**

Nope, it's a bug.

**Please mention other relevant information such as the browser version, Node.js version, webpack version and Operating System.**

```sh
$ node --version
v4.3.2

$ npm ls webpack
└── webpack@2.2.1

$ uname -a
Darwin titan.local 14.5.0 Darwin Kernel Version 14.5.0: Sun Sep 25 22:07:15 PDT 2016; root:xnu-2782.50.9~1/RELEASE_X86_64 x86_64
```
