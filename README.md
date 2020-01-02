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

4.  React
    npm install --save react react-dom
    修改 src/index.js 使用 react

    ```
    import React from 'react';
    import ReactDom from 'react-dom';ReactDom.render(
    <div>Hello React!</div>, document.getElementById('app'));
    ```

    组件化
    cd src
    mkdir component
    cd component
    mkdir Hello
    cd Hello
    type nul.>Hello.js

    修改 src/index.js，引用 Hello 组件！
    src/index.js

    ```
    import React from 'react';
    import ReactDom from 'react-dom';
    import Hello from './component/Hello/Hello';
    ReactDom.render(<Hello/>, document.getElementById('app'));
    ```

5.  命令优化
    package.json

    ```
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev-build": "webpack --config webpack.dev.config.js"
    }
    ```

    npm run dev-build

6.  react-router
    npm install --save react-router-dom
    cd src
    mkdir router && type nul.>router/router.js

    按照 react-router 文档编辑一个最基本的 router.js。包含两个页面 home 和 page1。
    src/router/router.js

    ```
    import React from 'react';
    import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
    import Home from '../pages/Home/Home';
    import Page1 from '../pages/Page1/Page1';
    const getRouter = () => (
    <Router>
    <div>
    <ul>
    <li><Link to="/">首页</Link></li>
    <li><Link to="/page1">Page1</Link></li>
    </ul>
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/page1" component={Page1}/>
    </Switch>
    </div>
    </Router>
    );
    export default getRouter;
    ```

    新建页面文件夹
    cd src
    mkdir pages
    cd pages
    mkdir Home && type nul.>Home/Home.js
    mkdir Page1 && type nul.>Page1/Page.js

    src/pages/Home/Home.js

    ```
    import React, {Component} from 'react';
    export default class Home extends Component {
        render() {
            return (
                <div>
                    this is home~
                </div>
            )
        }
    }
    ```

    Page1.js

    ```
    import React, {Component} from 'react';
    export default class Page1 extends Component {
        render() {
            return (
                <div>
                    this is Page1~
                </div>
            )
        }
    }
    ```

    现在路由和页面建好了，我们在入口文件 src/index.js 引用 Router。
    修改 src/index.js

    ```
    import React from 'react';
    import ReactDom from 'react-dom';
    import getRouter from './router/router';
    ReactDom.render(
    getRouter(), document.getElementById('app'));
    ```

    执行打包命令 npm run dev-build。打开 index.html 查看效果啦！
    那么问题来了~我们发现点击‘首页’和‘Page1’没有反应。不要惊慌，这是正常的。
    我们之前一直用这个路径访问 index.html，类似这样：file:///F:/react/react-family/dist/index.html。
    这种路径了，不是我们想象中的路由那样的路径http://localhost:3000~我们需要配置一个简单的WEB服务器，指向index.html~有下面两种方法来实现
    a) Nginx, Apache, IIS 等配置启动一个简单的的 WEB 服务器。
    b) 使用 webpack-dev-server 来配置启动 WEB 服务器。
