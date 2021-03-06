const base = require('./webpack.base');
const { loaders, plugins } = require('./common');

module.exports = Object.assign(base, {
  mode: 'production',
  module: {
    rules: [loaders.babel, loaders.stylus.production],
  },
  plugins: [
    plugins.options,
    plugins.html.production,
    plugins.css,
    plugins.define.common,
    plugins.define.production,
  ],
});
