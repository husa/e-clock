const env = process.env.NODE_ENV || 'development';

const config = require(`./webpack/webpack.${env}.js`);

module.exports = config;
