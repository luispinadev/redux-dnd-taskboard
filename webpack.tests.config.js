var path = require('path')
var _ = require('lodash/fp')

var config = require('./webpack.config')

module.exports =  _.merge({
    
    devtool: 'inline-source-map',
    
    entry: [
      path.join(__dirname, 'src/index')
    ],
    
    resolve: {
      alias: {
        'sinon': 'sinon/pkg/sinon'
      }
    },

    module: {

      //enzyme fix
      noParse: [
          /node_modules\/sinon\//,
      ],
      
      preLoaders: [
        {
          test: /\.spec\.js$/,
          loaders: ['eslint'],
          exclude: /node_modules/
        }
      ],

      loaders: [
        { 
          test: /\.js$/,
          loader: 'babel',
          exclude: path.resolve(__dirname, 'node_modules'),
          query: {
            presets: ['es2015', 'react', 'stage-0', 'react-hmre', 'airbnb'],
            plugins: ['transform-decorators-legacy', 'transform-class-properties']
          }
        },
        { 
          test: /\.json$/, loader: 'json'
        },
        { 
          test: /\.styl$/,
          loader: 'style!css?localIdentName=[path][name]---[local]---[hash:base64:5]&modules&importLoaders=1!postcss!stylus',
          exclude: /node_modules/
        }
      ]

    },
    // enzyme
    externals: {
      // 'cheerio': 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    }
  
  },
  _.omit(['devtool','entry','module'], config), {}
)

