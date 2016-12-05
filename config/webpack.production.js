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
      loaders.stylus.production
    ]
  },
  plugins: [
    plugins.options,
    plugins.html.production,
    plugins.css,
    plugins.define.production,
    plugins.uglify
  ]
});
