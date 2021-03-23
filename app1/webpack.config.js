const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
//   entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 3001,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: "http://localhost:3001/",
    // filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"]
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      library: { type: "var", name: "app1" },
      filename: "remoteEntry1.js",
      exposes: {
        // expose each component
        "./Header": "./src/components/Header",
        "./Button": "./src/components/Button",
      },
      shared: {
          react: {
              eager: true,
          }
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
