'use strict'

const path = require('path')
const webpack = require('webpack')
const config = require('./config')

module.exports = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${config.port}`,
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.less?$/,
        loaders: ['style-loader', 'css-loader', 'less-loader'],
        include: path.join(__dirname, 'src')
      }
    ]
  }
}
