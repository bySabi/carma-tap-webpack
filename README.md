# carma-tap-webpack

[![npm version](https://badge.fury.io/js/carma-tap-webpack.svg)](https://badge.fury.io/js/carma-tap-webpack)
[![npm downloads](https://img.shields.io/npm/dm/carma-tap-webpack.svg?style=flat-square)](https://www.npmjs.com/package/carma-tap-webpack)
[![Build Status](https://travis-ci.org/bySabi/carma-tap-webpack.svg?branch=master)](https://travis-ci.org/bySabi/carma-tap-webpack)
[![Known Vulnerabilities](https://snyk.io/test/github/bysabi/carma-tap-webpack/badge.svg)](https://snyk.io/test/github/bysabi/carma-tap-webpack)

> add [Karma][karma], [TAP][tap] and [webpack][webpack] boilerplate test settings to projects

[karma]: http://karma-runner.github.io/1.0/index.html
[tap]: https://testanything.org/
[webpack]: https://webpack.github.io/

Setting `Karma` with many plugins it´s a time consuming process, many hours of trial and error. Now you have it all for free.

#### This package works only on `npm 3` environments and beyond. Don´t use it with `npm 2`

## What's include ?
* [karma-tap](https://github.com/tmcw-up-for-adoption/karma-tap), karma TAP adapter.
* [karma-tap-pretty-reporter](https://github.com/bySabi/karma-tap-pretty-reporter) cause everyone need a nice output. See supported [prettifiers](https://github.com/bySabi/karma-tap-pretty-reporter#supported-prettifiers)
* [tape](https://github.com/substack/tape) for test harness on node and browsers.
* karma browser launchers `karma-chrome-launcher`, `karma-jsdom-launcher`, ...
* [webpack](https://webpack.github.io/) and [karma-webpack](https://github.com/webpack/karma-webpack)

## Why `webpack` is needed for test?
* When we test code on browsers at the end we will need bundle: sources, test files and assets, other solutions can be use like `browserify` but we opinionated on `webpack`
* When Hot Module Replacement (HMR) is needed, webpack is the way to go.
* On Karma `autowatch` mode for a good performance a robust cache and rebuild solution is needed, `webpack` is best on this apart.

## Why all `karma` complex setup, why not just use the very simple [tape](https://github.com/substack/tape)?
If your project tests need
* browsers launch/switch/management
* file bundle
* file watch mode

Karma will provide it!

## Install

### npm
```bash
npm install karma webpack carma-tap-webpack --save-dev
```

### Add `karma.conf.js` to project folder
```js
const carma = require('carma-tap-webpack');

module.exports = function(config) {
  carma(config);
}
```

Custom karma settings can be added or defaults can be override. Defaults settings [karma.conf.js][karmaconfjs]

[karmaconfjs]: ./karma.conf.js

### Add karma and test scripts to `package.json`
```json
  "scripts": {
    "karma": "karma start",
    "testonly": "npm run karma",
    "test": "npm run testonly"
  },
```

## Test directory
By default Karma will search for files on project root `test` folder but this can be customize.

Example of project´s `karma.conf.js`
```js
const carma = require('carma-tap-webpack');
const webpack = require('webpack');

module.exports = function(config) {
  carma(config);
  config.set({  // overriding inherited settings
    // Set browser launcher
    browsers: process.env.CONTINUOUS_INTEGRATION === 'true' ? ['Firefox'] : ['jsdom'],

    webpack: {
      plugins: [
        // __TEST_DIR__ path '../../' is relative to inherited 'basePath' from  'carma'
        // __TEST_REGX__ file pattern match
        new webpack.DefinePlugin({
          '__TEST_DIR__': JSON.stringify('../../' + 'spec'),
          '__TEST_REGX__': /^.+\.(js|jsx)+$/g
        })
      ]
    }
  });
}
```

## Projects using `carma-tap-webpack`
* [React Scrollchor](https://github.com/bySabi/react-scrollchor)
* [React Scrollaware](https://github.com/bySabi/react-scrollaware)

## Contributing

* Documentation improvement
* Feel free to send any PR

## License

[ISC][isc-license]

[isc-license]:./LICENSE

