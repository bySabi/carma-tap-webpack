const carma = require('./');
const webpack = require('webpack');

module.exports = function(config) {
  carma(config);
  config.set({
    basePath: '',
    webpack: {
      plugins: [
        new webpack.DefinePlugin({
            '__TEST_DIR__': JSON.stringify('./test'),
            '__TEST_REGX__': /^.+\.(js|jsx)+$/g
        })
      ]
    }
  });
}
