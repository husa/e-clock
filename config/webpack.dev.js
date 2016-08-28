const base = require('./webpack.base');
const {loaders, plugins} = require('./common');
const defaults = require('./defaults');

module.exports = Object.assign(base, {
  module: {
    preLoaders: [
      loaders.eslint
    ],
    loaders: [
      loaders.babel,
      loaders.fonts,
      loaders.stylus_dev
    ]
  },
  plugins: [
    plugins.html.dev,
    plugins.define.dev
  ],
  cache: true,
  debug: true,
  devtool: 'cheap-source-map',
  devServer: {
    // contentBase: defaults.build,
    host: defaults.host,
    port: defaults.port,
    noInfo: false,
    colors: true,
    hot: true,
    progress: true,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  }
});
