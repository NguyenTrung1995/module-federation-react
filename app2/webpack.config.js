const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
//   entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 3002,
  },
  output: {
    publicPath: "http://localhost:3002/",
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
      name: "app2",
      library: { type: "var", name: "app2" },
      filename: "remoteEntry2.js",
      remotes: {
        app1: "app1",
      },
      exposes: {
        // expose each component
        "./App": "./src/App",
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
