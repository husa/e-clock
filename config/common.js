var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  loaders: {

    eslint: {
      test: /\.js$/,
      loader: 'eslint-loader',
      include: './src'
    },

    babel: {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    },

    stylus: {
      develop: {
        test: /\.styl/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      production: {
        test: /\.styl/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!stylus-loader'
        })
      }
    },

    fonts: {
      test: /\.woff/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: '[name]_[hash].[ext]'
      }
    }
  },

  plugins: {

    options: new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    html: {
      develop: new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'New Tab',
        cache: true,
        ENV: 'develop'
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
      develop: new webpack.DefinePlugin({
        'ENV': JSON.stringify('develop')
      }),
      production: new webpack.DefinePlugin({
        'ENV': JSON.stringify('production'),
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      })
    },

    uglify: new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    })
  }
};
