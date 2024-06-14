const path = require('path');

const paths = {
  src: path.resolve('./src'),
  build: path.resolve('./build'),
};

module.exports = {
  entry: {
    main: path.join(paths.src, 'main.tsx'),
  },
  output: {
    path: paths.build,
    filename: '[name]_[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
  },
};
