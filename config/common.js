var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  loaders: {
    eslint: {
      test: /\.js$/,
      loader: 'eslint',
      include: './src'
    },
    babel: {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel']
    },
    stylus_dev: {
      test: /\.styl/,
      loader: 'style!css!stylus'
    },
    stylus_dist: {
      test: /\.styl/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader!stylus-loader'
      })
    },
    fonts: {
      test: /\.woff/,
      loader: 'url',
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
      dev: new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'New Tab',
        cache: true,
        ENV: 'dev'
      }),
      dist: new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'New Tab',
        hash: true,
        ENV: 'dist'
      })
    },
    css: new ExtractTextPlugin('[name]_[hash].css'),
    define: {
      dev: new webpack.DefinePlugin({
        'ENV': JSON.stringify('dev')
      }),
      dist: new webpack.DefinePlugin({
        'ENV': JSON.stringify('dist'),
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
