const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const moduleRules = require('./webpack.modules.config.js')

const SRC_DIR = path.resolve(__dirname, 'app')
const DIST_DIR = path.resolve(__dirname, 'dist')

const config = {
  stats: 'errors-only',
  // stats: {
  //   maxModules: 0,
  // },

  mode: 'production',
  devtool: 'cheap-module-source-map',

  entry: ['./main.js'],

  context: SRC_DIR,

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: DIST_DIR,
    publicPath: '',
  },

  module: moduleRules,

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/app/index.html`,
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
    }),
    new CopyWebpackPlugin([{ from: './vendors', to: 'vendors' }]),
  ],

  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
}

module.exports = config
