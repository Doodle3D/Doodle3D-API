const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HTMLWebpackPlugin = require('html-webpack-plugin');

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: [
      require('babel-preset-env'),
      require('babel-preset-react')
    ],
    plugins: [
      require('babel-plugin-transform-object-rest-spread'),
      require('babel-plugin-transform-class-properties'),
      require('babel-plugin-transform-runtime')
    ],
    babelrc: false
  }
};

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules:  [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: babelLoader
      }, { // make THREE global available to three.js examples
        test: /three\/examples\/.+\.js/,
        use: 'imports-loader?THREE=three'
      }, {
        test: /\.worker\.js$/,
        use: ['worker-loader', babelLoader]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Doodle3D API - Simple example',
      template: require('html-webpack-template'),
      inject: false,
      appMountId: 'app'
    }),
  ],
  devtool: "source-map",
  devServer: {
    contentBase: 'dist'
  }
};
