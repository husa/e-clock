const env = process.env.NODE_ENV || 'develop';

const config = require(`./config/webpack.${env}.js`);

module.exports = config;
