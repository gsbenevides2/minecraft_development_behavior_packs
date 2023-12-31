
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
    fallback:{
      "tty": require.resolve("tty-browserify"),
      "timers": require.resolve("timers-browserify"),
      "fs": false,
      "assert": require.resolve("assert/"),
      "util": require.resolve("util/"),
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer/")
    }
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
    ],
  },
  plugins:[
    new webpack.ProvidePlugin({
      process: "process/browser"
    })
  ]
};
module.exports = webpackConfig;
