const env = process.env.NODE_ENV || 'development';

const config = require(`./config/webpack.${env}.js`);

module.exports = config;
