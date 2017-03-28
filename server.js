'use strict'

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.config')
const config = require('./config')

new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(config.port, 'localhost', (err, result) => {
  if (err) {
    console.log(err)
  }
  console.log(`Listening at localhost:${config.port}`)
})
