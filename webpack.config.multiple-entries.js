"use strict";

var path = require("path");
var webpack = require("webpack");

module.exports = {
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
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [path.join(__dirname, "src")],
        loader: "babel-loader",
        query: {
          presets: [
            [
              "es2015",
              {
                "modules": false
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      mangle: false,    // DEMO ONLY: Don't change variable names.
      beautify: true,   // DEMO ONLY: Preserve whitespace
      output: {
        comments: true  // DEMO ONLY: Helpful comments
      },
      sourceMap: false
    })
  ]
};
