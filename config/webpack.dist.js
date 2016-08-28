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
      loaders.stylus_dist
    ]
  },
  plugins: [
    plugins.html.dist,
    plugins.css,
    plugins.define.dist
  ]
});
