"use strict";

const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const SCENARIOS = ["one-file", "re-export"];

module.exports = SCENARIOS.map((scenario) => ({
  mode: "production",
  devtool: false,
  context: path.join(__dirname, "src", scenario),
  entry: {
    app1: "./app1.js",
    app2: "./app2.js"
  },
  output: {
    path: path.join(__dirname, "dist/multiple-entries", scenario),
    filename: "[name].js",
    pathinfo: true
  }
}));
