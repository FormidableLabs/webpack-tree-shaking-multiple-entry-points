"use strict";

const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

// Need **independent** webpack configs for tree-shaking to correctly determine
// unused libraries.
const ENTRY_POINTS = ["app1", "app2"];

module.exports = ENTRY_POINTS.map(function (entryName) {
  var entry = {};
  entry[entryName] = "./" + entryName + ".js";

  return {
    mode: "development",
    devtool: false,
    context: path.join(__dirname, "src"),
    entry: entry,
    output: {
      path: path.join(__dirname, "dist/array"),
      filename: "[name].js",
      pathinfo: true
    },
    plugins: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            dead_code: true   // Only DCE
          },
          mangle: false,      // DEMO ONLY: Don't change variable names.
          output: {
            comments: true,   // DEMO ONLY: Helpful comments
            beautify: true    // DEMO ONLY: Preserve whitespace
          }
        },
        sourceMap: false
      })
    ]
  };
});
