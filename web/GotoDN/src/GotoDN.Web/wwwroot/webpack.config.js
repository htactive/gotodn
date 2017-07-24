var nodeExternals = require('webpack-node-externals');
module.exports = {
  entry: {
    admin: ['./src/admin.tsx']
  },
  output: {
    path: __dirname + "/dist/application",
    publicPath: "/dist/application",
    filename: "[name].js"
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".js", ".jsx", ".ts", ".tsx"]
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      }
    ]
  },
  devtool: "source-map",
  target: 'node',
  externals: [nodeExternals({importType: "window", modulesFromFile: true})]
};