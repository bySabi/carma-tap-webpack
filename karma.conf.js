/* global process */
// Karma configuration
var webpack = require('webpack');

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'node_modules/carma-tap-webpack',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['tap'],

    // list of files / patterns to load in the browser
    files: [
      'tests1.webpack.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors:
    // https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'tests2.webpack.js': ['webpack']
    },

    webpack: {
      resolve: {
        extensions: ['', '.js', '.jsx', '.json']
      },
      module: {
        // used Babel for test
        /*
          loaders: [
            {
              test: /\.jsx?|\.js$/,
              loader: ['babel-loader?cacheDirectory=true'],
              exclude: /node_modules/
            },
          ]
        */
      },
      node: {
        fs: 'empty'
      },
      plugins: [
        new webpack.DefinePlugin({
          'global': {
            '__TEST_DIR__': JSON.stringify('../../test')
          }
        })
      ]
    },

    webpackMiddleware: {
      noInfo: true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['tap-pretty'],

    // prettifier's: 'faucet', 'tap-spec', 'tap-min', 'tap-diff',
    // 'tap-notify', 'tap-summary', 'tap-markdown'
    tapReporter: {
      // outputFile: './unit.tap',
      prettifier: 'faucet',
      separator: true
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file
    // changes
    autoWatch: true,

    // enable / disable browser logs on terminal
    browserConsoleLogOptions: {
      level: 'error',
      format: '%b %T: %m',
      terminal: false
    },

    // start these browsers
    // available browser launchers:
    // https://npmjs.org/browse/keyword/karma-launcher
    browsers: process.env.JSDOM === 'true' ? ['jsdom']
     : process.env.CONTINUOUS_INTEGRATION === 'true' ? ['Firefox'] : ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: process.env.CONTINUOUS_INTEGRATION === 'true'
  });
};
