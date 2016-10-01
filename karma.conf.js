const webpackConfig = require('./webpack.config');

process.env.BABEL_ENV = 'test';

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

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

    //
    client: {
      captureConsole: true
    },

    // webpack settings
    webpack: webpackConfig,

    // don't spam the console when running in karma!
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
