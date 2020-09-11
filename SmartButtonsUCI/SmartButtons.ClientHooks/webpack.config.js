/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  watch: true,
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "SmartButtons.ClientHooks.js",
    library: ["SmartButtons", "ClientHooks", "SmartButtons"],
    libraryTarget: "var",
  },
};
