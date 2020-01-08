const path = require('path');
const srcRoot = './src';

module.exports = {
  devtool: 'inline-source-map',
  /** 入口 */
  entry: ['react-hot-loader/patch', path.join(__dirname, 'src/index.js')],
  // entry: [    './app.js'  ],
  // entry:path.resolve(srcRoot,'./page/index/index.js'),
  /** 输出到dist文件夹，输出文件名滋味bundle.min.js */
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.min.js',
    chunkFilename: '[name].js'
  },
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true,
    host: '0.0.0.0'
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
        use: ['babel-loader?cacheDirectory=true'],
        include: path.join(__dirname, 'src')
      },
      // { test: /\.(js|jsx)$/, use: [{ loader: 'babel-loader' }], include: path.resolve(srcRoot) }
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
  }
};
