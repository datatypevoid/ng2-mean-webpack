// @datatype_void

var webpack = require('webpack');
var helpers = require('./helpers');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';
var HMR = helpers.hasProcessFlag('hot');

var config = require('./config/config.json');

var metadata = {
  title: 'Angular 2 MEAN Webpack Starter Kit by @datatype_void',
  baseUrl: '/',
  host: '0.0.0.0',
  port: 8080,
  ENV: ENV,
  HMR: HMR
};
/*
 * Config
 */
module.exports = {
  // static data for index.html
  metadata: metadata,
  devtool: 'cheap-module-eval-source-map',
  // cache: true,
  debug: true,
  // devtool: 'eval' // for faster builds use 'eval'

  // our angular app
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['', '.ts', '.js', '.scss']
  },

  // Config for our build files
  output: {
    path: helpers.root('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    preLoaders: [
      // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ helpers.root('node_modules') ] },
      // TODO(datatypevoid):
      //`exclude: [ helpers.root('node_modules/rxjs') ]`
      //fixed with rxjs 5 beta.3 release
      { test: /\.js$/, loader: "source-map-loader",
        exclude: [ helpers.root('node_modules/rxjs') ]
      }
    ],
    loaders: [
      // Support for .ts files.
      { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: [ /\.(spec|e2e)\.ts$/ ] },

      // Support for *.json files.
      { test: /\.json$/,  loader: 'json-loader' },

      // Support for CSS as raw text
      { test: /\.css$/,   loader: 'raw-loader' },

      // support for .html as raw text
      { test: /\.html$/,  loader: 'raw-loader', exclude: [ helpers.root('src/index.html') ] },

      // support for sass imports
      // add CSS rules to your document:
      // `require("!style!css!sass!./file.scss");`
      {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer-loader?browsers=last 2 versions!sass',
        exclude: [ helpers.root('node_modules') ]
      }

      // if you add a loader include the resolve file extension above
    ]
  },

  plugins: [
    new ForkCheckerPlugin(),
    // TODO(datatypevoid): investigate the necessity of these two
    // following lines
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'vendor', 'polyfills'], filename: '[name].bundle.js', minChunks: Infinity }),
    // static assets
    new CopyWebpackPlugin([ { from: 'src/assets', to: 'assets' } ]),
    // generating html
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'none'
    }),
    // Environment Helpers  (when adding more properties make sure you include them in custom-typings.d.ts)
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(metadata.ENV),
      'HMR': HMR
    })
  ],

  // Other module loader config

  // our Webpack Development Server config

  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src',
  },

  devServer: {
    // Proxy requests to our express server
    proxy: {
      '*': {
        target: 'http://localhost:' + config.PORT,
        secure: false
      },
    },
    port: metadata.port,
    host: metadata.host,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    node: {
      global: 'window',
      progress: true,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  }
};
