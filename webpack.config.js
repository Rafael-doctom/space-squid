const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/script.js',
  plugins: [
    new HtmlWebpackPlugin({
      favicon: 'src/assets/favicon.png',
      title: 'Space Squid',
      template: 'src/index.html'
    }),
  ],
  output: {
    filename: 'bundle.js',
    publicPath: this.mode === 'production' ? './space-squid' : './',
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