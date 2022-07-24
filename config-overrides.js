/* config-overrides.js */
const webpack = require('webpack');
module.exports = function override(config, env) {
  //do stuff with the webpack config...

  config.resolve.fallback = {
    assert: require.resolve('assert'),
    buffer: require.resolve('buffer'),
    stream: require.resolve('stream-browserify'),
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  );

  return config;
};
