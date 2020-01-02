# REACT - THREE.JS

# https://github.com/brickspert/blog/issues/1

1.  init 项目基本信息
    npm init(生成 package.json)
2.  webpack
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
3.  babel
    babel-core 调用 Babel 的 API 进行转码
    babel-loader
    babel-preset-es2015 用于解析 ES6
    babel-preset-react 用于解析 JSX
    babel-preset-stage-0 用于解析 ES7 提案
    npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0
    新建 babel 配置文件.babelrc
    type nul.> .babelrc
    ```
    {
    "presets": [
      "es2015",
      "react",
      "stage-0"
    ],
    "plugins": []
    }
    ```
    修改 webpack.dev.config.js，增加 babel-loader
    ```
     /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
     /*cacheDirectory是用来缓存编译结果，下次编译加速*/
     module: {
         rules: [{
             test: /\.js$/,
             use: ['babel-loader?cacheDirectory=true'],
             include: path.join(__dirname, 'src')
         }]
     }
    ```
        Module build failed (from ./node_modules/babel-loader/lib/index.js):
    Error: Cannot find module '@babel/core'
    babel-loader@8 requires Babel 7.x (the package '@babel/core'). If you'd like to use Babel 6.x ('babel-core'), you should install 'babel-loader@7'.
