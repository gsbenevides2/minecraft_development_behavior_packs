
const webpack = require("webpack");
const path = require("path");

/** @type  webpack.Configuration */
const webpackConfig = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/Main.ts",
  output: {
    filename: "Main.js",
    path: path.resolve(__dirname, "./scripts"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  externals: {
    "@minecraft/server": "@minecraft/server",
    "@minecraft/server-ui": "@minecraft/server-ui",
    "@minecraft/server-net": "@minecraft/server-net",
  },
  externalsType: "module",
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
      {
        test:/\.json$/,
        loader: "json-loader",
        type: "javascript/auto",
        options: {
          esModule: false,
        },
      }
    ],
  },
};
module.exports = webpackConfig;
