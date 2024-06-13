const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv').config();

const YAHOO_APP_ID = process.env.YAHOO_APP_ID;
const YAHOO_CONSUMER_KEY = process.env.YAHOO_CONSUMER_KEY;
const YAHOO_CONSUMER_SECRET = process.env.YAHOO_CONSUMER_SECRET;

const stylusLoader = {
  loader: 'stylus-loader',
  options: {
    stylusOptions: {
      resolveUrl: false
    }
  }
}

const cssLoader = {
  loader: "css-loader",
  options: {
    url: false
  },
}

module.exports = {
  loaders: {
    babel: {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },

    stylus: {
      development: {
        test: /\.styl/,
        use: ['style-loader', cssLoader, stylusLoader]
      },
      production: {
        test: /\.styl/,
        use: [MiniCssExtractPlugin.loader, cssLoader, stylusLoader],
      },
    },
  },

  plugins: {
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
  },
};
