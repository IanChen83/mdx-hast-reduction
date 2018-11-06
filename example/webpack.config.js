const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const moduleRules = require('./webpack.modules.config.js')

const SRC_DIR = path.resolve(__dirname, 'app')
const BUILD_DIR = path.resolve(__dirname, 'build')
const DIST_DIR = path.resolve(__dirname, 'dist')

const config = {
  stats: {
    modules: false,
    maxModules: 0,
  },

  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './main.js',
  ],

  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
    publicPath: '',
  },

  context: SRC_DIR,

  devServer: {
    hot: true,
    contentBase: BUILD_DIR,
    historyApiFallback: true,
    publicPath: '/',
    stats: {
      modules: false,
    },
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: moduleRules,

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin([{ from: 'vendors', to: 'vendors' }]),
    new webpack.HotModuleReplacementPlugin(),
  ],
}

module.exports = config
