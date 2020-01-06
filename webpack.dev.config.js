const path = require('path');
const srcRoot = './src';

module.exports = {
  /** 入口 */
  entry: ['react-hot-loader/patch', path.join(__dirname, 'src/index.js')],
  // entry: [    './app.js'  ],
  // entry:path.resolve(srcRoot,'./page/index/index.js'),
  /** 输出到dist文件夹，输出文件名滋味bundle.min.js */
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.min.js'
  },
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true,
    host: '0.0.0.0',
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader?cacheDirectory=true'],
        include: path.join(__dirname, 'src')
      }
      // { test: /\.(js|jsx)$/, use: [{ loader: 'babel-loader' }], include: path.resolve(srcRoot) }
    ]
  }
};
