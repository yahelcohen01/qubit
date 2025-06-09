const { composePlugins, withNx } = require('@nx/webpack');
const path = require('path');

// Nx plugins for webpack.
const config = composePlugins(withNx(), (config) => {
  // Update the webpack config as needed here.
  config.target = 'node';
  config.output = {
    ...config.output,
    filename: '[name].js',
  };

  // Add resolve configuration for path aliases
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve?.alias,
      '@utils': path.resolve(__dirname, '../../libs/utils/src'),
      '@controllers': path.resolve(__dirname, './src/controllers'),
      '@types': path.resolve(__dirname, '../../libs/types/src'),
    },
  };

  return config;
});

module.exports = config;
