'use strict'

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const express = require('express')


// ------------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------------

require('babel-register')
const webpackConfig = require('./webpack.config')


// Server setup
const config = require('./config')

const app = new express()
const router = express.Router()
const port = config.devServerPort
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // application/json parsing
app.use(bodyParser.urlencoded({ extended: true })) // application/x-www-form-urlencoded parsing

// HMR middleware
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath, historyApiFallback: true, stats: {colors: true} }))
app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
  stats: { colors: true }
}))


// ------------------------------------------------------------------------------
// Routing 
// ------------------------------------------------------------------------------

// map static assets request to /public fs folder
app.use('/assets', express.static('public'))

// serve index.html
router.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})


// ------------------------------------------------------------------------------
// Init server
// ------------------------------------------------------------------------------
//

app.use('/', router)
app.listen(port, error => {
  if (error) console.error(error)
  else console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
})

