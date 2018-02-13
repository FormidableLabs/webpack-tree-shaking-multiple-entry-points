"use strict";

const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const SCENARIOS = ["one-file", "re-export"];
const ENTRY_POINTS = ["app1", "app2"];

module.exports = SCENARIOS
  .map((scenario) => ENTRY_POINTS.map((entryName) => ({
    mode: "production",
    devtool: false,
    context: path.join(__dirname, "src", scenario),
    entry: {
      [entryName]: "./" + entryName + ".js"
    },
    output: {
      path: path.join(__dirname, "dist/array", scenario),
      filename: "[name].js",
      pathinfo: true
    }
  })))
  // Flatten
  .reduce((m, c) => m.concat(c), []);
