const webpack = require('webpack');

module.exports = {
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
        query: {
          cacheDirectory: true,
/*
          presets: [
            ['es2015', { 'loose': true, 'modules': false }]
          ]
*/
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
}
