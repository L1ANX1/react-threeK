const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  /** 入口 */
  entry: {
    app: [path.join(__dirname, 'src/index.js')],
    vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
  },
  /** 输出到dist文件夹，输出文件名滋味bundle.min.js */
  output: {
    publicPath: '/',
    path: path.join(__dirname, './dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      '@pages': path.join(__dirname, 'src/pages'),
      '@component': path.join(__dirname, 'src/component'),
      '@router': path.join(__dirname, 'src/router'),
      '@actions': path.join(__dirname, 'src/redux/actions'),
      '@reducers': path.join(__dirname, 'src/redux/reducers'),
      '@redux': path.join(__dirname, 'src/redux')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      // { test: /\.(js|jsx)$/, use: [{ loader: 'babel-loader' }], include: path.resolve(srcRoot) }
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ filename: 'index.html', template: path.join(__dirname, 'src/index.html') }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      name: 'runtime'
    }),
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process-env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:5].css',
      allChunks: true
    })
  ]
};
