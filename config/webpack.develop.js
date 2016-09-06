const base = require('./webpack.base');
const {loaders, plugins} = require('./common');

module.exports = Object.assign(base, {
  module: {
    preLoaders: [
      loaders.eslint
    ],
    loaders: [
      loaders.babel,
      loaders.fonts,
      loaders.stylus.develop
    ]
  },
  plugins: [
    plugins.html.develop,
    plugins.define.develop
  ],
  cache: true,
  debug: true,
  devtool: 'cheap-source-map',
  }
});
