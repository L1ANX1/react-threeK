# REACT - THREE.JS

# https://github.com/brickspert/blog/issues/1

1. init 项目基本信息
   npm init(生成 package.json)
2. webpack
   a) npm install --save-dev webpack
   Q: 什么时候用--save-dev，什么时候用--save？A: --save-dev 是你开发时候依赖的东西，--save 是你发布之后还依赖的东西。
   b) type nul.> webpack.dev.config.js
   ```
   const path = require('path');
   module.exports = {
   /_入口_/
   ...
   /_输出到 dist 文件夹，输出文件名字为 bundle.min.js_/
   ...
   };
   ```
   c)使用 webpack 编译文件（webpack 需要安装全局 --g）
   mkdir src
   type nul.> ./src/index.js
   ```
   document.getElementById('app').innerHTML = "Webpack works"
   ```
   package.json
   ```
   "scripts": {
   "test": "echo \"Error: no test specified\" && exit 1",
   "webpack": "webpack --config webpack.dev.config.js"
   },
   ```
   npm run webpack
   生成了 dist 文件夹和 bundle.min.js
   d) 测试
   type nul.> ./dist/index.html
   ```
   <!doctype html>
   <html lang="en">
   <head>
   <meta charset="UTF-8">
   <title>Document</title>
   </head>
   <body>
   <div id="app"></div>
   <script type="text/javascript" src="./bundle.min.js" charset="utf-8"></script>
   </body>
   </html>
   ```
