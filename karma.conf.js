var webpackConfig = require('./webpack.tests.config')
 
module.exports = function (config) {
  config.set({

    browsers: [ 'Chrome' ],

    singleRun: false,

    autoWatch: true,

    frameworks: [ 'chai', 'mocha' ],

    files: [
      'karma.entry.js'
    ],

    plugins: [
      'karma-chrome-launcher',
      // 'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],

    preprocessors: {
      'karma.entry.js': [ 'webpack', 'sourcemap' ],
      'src/**/*': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'mocha' ],

    webpack: webpackConfig,

    webpackServer: {
      noInfo: true
    }

  })
}