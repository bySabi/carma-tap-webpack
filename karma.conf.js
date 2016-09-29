const webpack = require('webpack');
const babelLoaderQuery = require('./babel.js');

process.env.BABEL_ENV = 'test';

const carmaPath = 'node_modules/carma-tap-webpack';

module.exports = function(config) {
  const basePath = '';
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: basePath,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['tap'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/carma-tap-webpack/tests.webpack.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors:
    // https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'node_modules/carma-tap-webpack/tests.webpack.js': ['webpack', 'sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map',
      // all these extensions will be resolved without specifying extension in the `require`
      resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
      },
      plugins: [
        new webpack.DefinePlugin({
          '__TEST_DIR__': JSON.stringify('../../test'),
          '__TEST_REGX__': /^.+\.(js|jsx)+$/g
        })
      ],
      module: {
        // used Babel for test
        loaders: [
          {
            test: /\.jsx?|\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
           // query: babelLoaderQuery({ basePath: '.' })
           // query: babelLoaderQuery({ basePath: '.' })
           query: {
            babelrc: false,
            preset: ['es2015']
           }
          },
          {
            test: /\.json$/,
            exclude: /node_modules/,
            loader: 'json-loader'
          }
        ]
      },
      // settings for React and Enzyme
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      node: {
        fs: 'empty'
      }
    },

    // don't spam the console when running in karma!
    webpackMiddleware: {
      noInfo: true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['tap-pretty', 'coverage'],

    // prettifier's: 'faucet', 'tap-spec', 'tap-min', 'tap-diff',
    // 'tap-notify', 'tap-summary', 'tap-markdown'
    tapReporter: {
      // outputFile: './unit.tap',
      prettifier: 'faucet',
      separator: true
    },

    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {
          type: 'html',
          subdir: 'report-html'
        },
        {
          type: 'lcov',
          subdir: 'report-lcov'
        },
        {
          type: 'cobertura',
          subdir: '.',
          file: 'cobertura.txt'
        }
      ]
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

    // custom browser launchers
    customLaunchers: {
      // chrome settings for CI, Ex: 'Travis'
      'Chrome_ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    // start these browsers
    // available browser launchers:
    // https://npmjs.org/browse/keyword/karma-launcher
    browsers: process.env.CONTINUOUS_INTEGRATION === 'true' ? ['Chrome_ci'] : ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: process.env.CONTINUOUS_INTEGRATION === 'true'
  });
}
