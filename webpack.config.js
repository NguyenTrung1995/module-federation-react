const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
//   entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 4000,
  },
  output: {
    publicPath: "http://localhost:4000/",
    // path: path.resolve(__dirname, 'dist'),
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
      name: "host",
      library: { type: "var", name: "host" },
      remotes: {
        app1: "app1",
        app2: "app2",
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
