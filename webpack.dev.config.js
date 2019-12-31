const path = require('path');
module.exports = {
  /** 入口 */
  entry: path.join(__dirname, 'src/index.js'),
  // entry: [    './app.js'  ],
  // entry:path.resolve(srcRoot,'./page/index/index.js'),
  /** 输出到dist文件夹，输出文件名滋味bundle.min.js */
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.min.js'
  }
};
