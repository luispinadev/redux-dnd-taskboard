const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  
  devtool: '#inline-source-map', // '#cheap-module-eval-source-map',

  debug: true,
  progress: true,

  resolve: {
    root: [path.resolve(__dirname)],
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.json', '.styl'],
    alias: {
      // project
      'config': path.join(__dirname, 'config'),
      // app
      'actions': path.join(__dirname, 'src/actions'),
      // 'api': path.join(__dirname, 'src/api'),
      'constants': path.join(__dirname, 'src/constants'),
      'records': path.join(__dirname, 'src/records'),
      'reducers': path.join(__dirname, 'src/reducers'),
      // 'sagas': path.join(__dirname, 'src/sagas'),
      // 'selectors': path.join(__dirname, 'src/selectors'),
      'shared-styles': path.join(__dirname, 'src/shared-styles'),
      'store': path.join(__dirname, 'src/store'),
      'views': path.join(__dirname, 'src/views')
    }
  },

  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src/index')
  ],

  output: {
    path: path.join(__dirname, 'public','js'),
    filename: 'bundle.js',
    publicPath: '/assets/js'
  },

  plugins: [
    // generate index.html
    new HtmlWebpackPlugin({ 
      filename: path.join(__dirname, 'public', 'index.html'),
      template: path.join(__dirname, 'src', 'template.html') 
    }),
    // Hot module replacement
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        loaders: ['eslint'],
        exclude: /node_modules/
      }
    ],
    loaders: [
      //javascript
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/
      },
      // JSON
      { 
        test: /\.json$/, loaders: [ 'json' ], exclude: /node_modules/ 
      },
      // Extract css
      // separate css: loader: ExtractTextPlugin.extract
      // Stylus
      { 
        test: /\.styl$/,                      // localIdentName=[path][name]---[local]---[hash:base64:5]
        loader: 'style!css?localIdentName=[path][name]---[local]&modules&importLoaders=1!postcss!stylus',
        exclude: /node_modules/
      },
      // HTML
      { test: /\.html$/, loader: 'html-loader' }
    ]
  },

  postcss: [ autoprefixer( { browsers: ['last 2 versions'] }) ]

}
