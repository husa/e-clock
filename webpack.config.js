/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV || 'development';

const YAHOO_APP_ID = process.env.YAHOO_APP_ID;
const YAHOO_CONSUMER_KEY = process.env.YAHOO_CONSUMER_KEY;
const YAHOO_CONSUMER_SECRET = process.env.YAHOO_CONSUMER_SECRET;

const cssLoader = {
  loader: 'css-loader',
  options: {
    url: false,
  },
};

const loaders = {
  babel: {
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: ['ts-loader'],
  },
  scss: {
    development: {
      test: /\.s[ac]ss$/i,
      use: ['style-loader', cssLoader, 'sass-loader'],
    },
    production: {
      test: /\.s[ac]ss$/i,
      use: [MiniCssExtractPlugin.loader, cssLoader, 'sass-loader'],
    },
  },
};

const plugins = {
  options: new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),

  html: {
    development: new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'New Tab',
      cache: true,
      ENV: 'development',
    }),
    production: new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'New Tab',
      hash: true,
      ENV: 'production',
    }),
  },

  css: new MiniCssExtractPlugin({
    filename: '[name]_[hash].css',
  }),

  define: {
    common: new webpack.DefinePlugin({
      __YAHOO_APP_ID__: JSON.stringify(YAHOO_APP_ID),
      __YAHOO_CONSUMER_KEY__: JSON.stringify(YAHOO_CONSUMER_KEY),
      __YAHOO_CONSUMER_SECRET__: JSON.stringify(YAHOO_CONSUMER_SECRET),
    }),
    development: new webpack.DefinePlugin({
      ENV: JSON.stringify('development'),
    }),
    production: new webpack.DefinePlugin({
      ENV: JSON.stringify('production'),
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  },
};

const paths = {
  src: path.resolve('./src'),
  build: path.resolve('./build'),
};

const base = {
  entry: {
    main: path.join(paths.src, 'main.tsx'),
  },
  output: {
    path: paths.build,
    filename: '[name]_[chunkhash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
  },
};

module.exports = () => {
  if (env === 'development') {
    return {
      ...base,
      mode: 'development',
      module: {
        rules: [loaders.babel, loaders.scss.development],
      },
      plugins: [plugins.html.development, plugins.define.common, plugins.define.development],
      cache: true,
      devtool: 'cheap-module-source-map',
    };
  }

  return {
    ...base,
    mode: 'production',
    module: {
      rules: [loaders.babel, loaders.scss.production],
    },
    plugins: [
      plugins.options,
      plugins.html.production,
      plugins.css,
      plugins.define.common,
      plugins.define.production,
    ],
  };
};
