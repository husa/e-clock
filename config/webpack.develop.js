const base = require('./webpack.base');
const {loaders, plugins} = require('./common');

module.exports = Object.assign(base, {
  module: {
    rules: [
      Object.assign({
        enforce: 'pre'
      }, loaders.eslint),
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
  devtool: 'cheap-source-map'
});
