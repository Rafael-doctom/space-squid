const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/script.js',
  plugins: [
    new HtmlWebpackPlugin({
      favicon: 'src/assets/favicon.png',
      title: 'Space Squid',
      template: 'src/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
      {from: 'src/assets', to: 'assets'}
    ]}),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};