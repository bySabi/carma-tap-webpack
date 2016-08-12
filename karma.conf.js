/* global process */
// Karma configuration

var carma = require('carma-tap');

module.exports = function(config) {
  carma(config);
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './node_modules/carma-tap-webpack',

    // list of files / patterns to load in the browser
    files: [
      'tests.webpack.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors:
    // https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
     'tests.webpack.js': ['webpack']
    },

    webpack: {
      resolve: {
        extensions: ['', '.js', '.jsx', '.json']
      },
      module: {
        // used Babel for test
        loaders: [
          {
            test: /\.jsx?|\.js$/,
            loader: ['babel-loader?cacheDirectory=true'],
            exclude: /node_modules/
          }
        ]
      },
      node: {
        fs: 'empty'
      }
    },

    webpackMiddleware: {
      noInfo: true
    }
  });
};
