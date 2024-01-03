const path = require("path");
const { merge } = require("webpack-merge");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const commonConfig = {
  entry: "./js/index.js",
  module: {
    rules: [
      {
        test: /\.css\$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "index.html"
    })
  ]
};

const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
}

const prodConfig = {
  mode: "production",
  output: {
    filename: "bundle.min.js",
    path: path.resolve(__dirname, "dist")
  }
};

module.exports = (env, args) => {
  switch(args.mode) {
    case "development":
      return merge(commonConfig, devConfig);
    case "production":
      return merge(commonConfig, prodConfig);
    default:
      throw new Error("No matching config found!");
  }
};

// module.exports = {
//   entry: "./js/index.js",
//   mode: "development",
//   devtool: "inline-source-map",
//   output: {
//     filename: "bundle.js",
//     path: path.resolve(__dirname, "dist")
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css\$/i,
//         use: ["style-loader", "css-loader"]
//       }
//     ]
//   },
//   plugins: [
//     new HTMLWebpackPlugin({
//       template: "index.html"
//     })
//   ]
// };
