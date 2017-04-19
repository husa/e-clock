const path = require('path');

module.exports = {
  entry: {
    main: path.resolve('./src/main.js')
  },
  output: {
    path: path.resolve('./build'),
    filename: '[name]_[hash].js'
  }
};
