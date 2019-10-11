const path = require('path');

const paths = {
  src: path.resolve('./src'),
  build: path.resolve('./build')
};

module.exports = {
  entry: {
    main: path.join(paths.src, 'main.js')
  },
  output: {
    path: paths.build,
    filename: '[name]_[hash].js',
    publicPath: '/'
  }
};
