const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  loaders: {

    babel: {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },

    stylus: {
      development: {
        test: /\.styl/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      production: {
        test: /\.styl/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'stylus-loader'
          ]
        })
      }
    }
  },

  plugins: {

    options: new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    html: {
      development: new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'New Tab',
        cache: true,
        ENV: 'development'
      }),
      production: new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'New Tab',
        hash: true,
        ENV: 'production'
      })
    },

    css: new ExtractTextPlugin('[name]_[hash].css'),

    define: {
      development: new webpack.DefinePlugin({
        'ENV': JSON.stringify('development')
      }),
      production: new webpack.DefinePlugin({
        'ENV': JSON.stringify('production'),
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      })
    },

    uglify: new UglifyJSPlugin({
      uglifyOptions: {
        ecma: 6
      }
    })
  }
};
