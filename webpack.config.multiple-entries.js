"use strict";

const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: false,
  context: path.join(__dirname, "src"),
  entry: {
    app1: "./app1.js",
    app2: "./app2.js"
  },
  output: {
    path: path.join(__dirname, "dist/multiple-entries"),
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
