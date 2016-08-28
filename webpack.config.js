const parseArgs = require('minimist');

const args = parseArgs(process.argv.slice(2));

const config = require(`./config/webpack.${args.env}.js`);

module.exports = config;
