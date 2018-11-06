/* eslint-disable no-console */
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MDXHastReduction = require('mdx-hast-reduction')

module.exports = {
  rules: [
    {
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
    },

    {
      test: /\.md?x$/,
      use: [
        'babel-loader',
        {
          loader: '@mdx-js/loader',
          options: {
            hastPlugins: [MDXHastReduction],
          },
        },
      ],
    },

    // To keep it simple, disable the following loaders
    // {
    //   test: /\.scss$/,
    //   exclude: /node_modules/,
    //   use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
    //     fallback: 'style-loader',
    //     use: [
    //       'css-loader',
    //       {
    //         loader: 'sass-loader',
    //         query: {
    //           sourceMap: false,
    //         },
    //       },
    //     ],
    //     publicPath: '../'
    //   })),
    // },
    // {
    //   test: /\.(png|jpg|gif)$/,
    //   use: [
    //     {
    //       loader: 'url-loader',
    //       options: {
    //         limit: 8192,
    //         mimetype: 'image/png',
    //         name: 'images/[name].[ext]',
    //       }
    //     }
    //   ],
    // },
    // {
    //   test: /\.eot(\?v=\d+.\d+.\d+)?$/,
    //   use: [
    //     {
    //       loader: 'file-loader',
    //       options: {
    //         name: 'fonts/[name].[ext]'
    //       }
    //     }
    //   ],
    // },
    // {
    //   test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    //   use: [
    //     {
    //       loader: 'url-loader',
    //       options: {
    //         limit: 8192,
    //         mimetype: 'application/font-woff',
    //         name: 'fonts/[name].[ext]',
    //       }
    //     }
    //   ],
    // },
    // {
    //   test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
    //   use: [
    //     {
    //       loader: 'url-loader',
    //       options: {
    //         limit: 8192,
    //         mimetype: 'application/octet-stream',
    //         name: 'fonts/[name].[ext]',
    //       }
    //     }
    //   ],
    // },
    // {
    //   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    //   use: [
    //     {
    //       loader: 'url-loader',
    //       options: {
    //         limit: 8192,
    //         mimetype: 'image/svg+xml',
    //         name: 'images/[name].[ext]',
    //       }
    //     }
    //   ],
    // },
  ],
}
