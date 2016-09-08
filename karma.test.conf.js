var carma = require('./');
var webpack = require('webpack');

module.exports = function(config) {
  carma(config);
  config.set({
    basePath: '',
    webpack: {
      plugins: [
        new webpack.DefinePlugin({
          '__TEST_DIR__': JSON.stringify('./test')
        })
      ]
    }
  });
}
