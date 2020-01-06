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
    c)使用 webpack 编译文件（webpack 需要安装全局 --g 如果是直接执行 webpack --config webpack.dev.config.js webpack-cli 也需要全局安装）
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

7.  webpack-dev-server
    简单来说，webpack-dev-server 就是一个小型的静态文件服务器。使用它，可以为 webpack 打包生成的资源文件提供 Web 服务
    npm install webpack-dev-server --save-dev
    webpack-dev-server 需要全局安装，要不后面用的时候要写相对路径。需要再执行这个 npm install webpack-dev-server -g
    修改 webpack.dev.config.js,增加 webpack-dev-server 的配置。
    webpack.dev.config.js

    ```
    devServer: {
        contentBase: path.join(__dirname, './dist')
    }
    ```

    webpack-dev-server --config webpack.dev.config.js
    浏览器打开http://localhost:8080，OK,现在我们可以点击首页,Page1了，
    看 URL 地址变化啦！我们看到 react-router 已经成功。
    Q: --content-base 是什么？
    A：URL 的根目录。如果不设定的话，默认指向项目根目录。
    重要提示：webpack-dev-server 编译后的文件，都存储在内存中，我们并不能看见的。你可以删除之前遗留的文件 dist/bundle.js，
    仍然能正常打开网站！
    每次执行 webpack-dev-server --config webpack.dev.config.js,要打很长的命令，我们修改 package.json，增加 script->start:

    ```
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev-build": "webpack --config webpack.dev.config.js",
        "start": "webpack-dev-server --config webpack.dev.config.js"
    }
    ```

    下次执行 npm start 就可以了。
    webpack-dev-server，我们就看看它的其他的配置项。
    看了之后，发现有几个我们可以用的。

    - color（CLI only） console 中打印彩色日志-
    - historyApiFallback 任意的 404 响应都被替代为 index.html。有什么用呢？你现在运行 npm start，然后打开浏览器，访问http://localhost:8080,然后点击Page1到链接http://localhost:8080/page1，然后刷新页面试试。是不是发现刷新后 404 了。为什么？dist 文件夹里面并没有 page1.html,当然会 404 了，所以我们需要配置 historyApiFallback，让所有的 404 定位到 index.html。-
    - host 指定一个 host,默认是 localhost。如果你希望服务器外部可以访问，指定如下：host: "0.0.0.0"。比如你用手机通过 IP 访问。-
    - hot 启用 Webpack 的模块热替换特性。-
    - port 配置要监听的端口。默认就是我们现在使用的 8080 端口。-
    - proxy 代理。比如在 localhost:3000 上有后端服务的话，你可以这样启用代理：

    ```
    proxy: {"/api": "http://localhost:3000"}
    ```

    progress（CLI only） 将编译进度输出到控制台。

    根据这几个配置，修改下我们的 webpack-dev-server 的配置~
    webpack.dev.config.js

    ```
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        host: '0.0.0.0'
    }
    ```

    CLI ONLY 的需要在命令行中配置
    package.json

    ```
    "start": "webpack-dev-server --config webpack.dev.config.js --color --progress"
    ```

    现在我们执行 npm start 看看效果。是不是看到打包的时候有百分比进度？在http://localhost:8080/page1页面刷新是不是没问题了？
    用手机通过局域网 IP 是否可以访问到网站？ no idea

8.  模块热替换（Hot Module Replacement）
    package.json 增加 --hot
    "start": "webpack-dev-server --config webpack.dev.config.js --color --progress --hot"
    或
    const webpack = require('webpack');
    devServer: {
    hot: true
    }
    plugins:[
    new webpack.HotModuleReplacementPlugin()
    ]

    src/index.js 增加 module.hot.accept(),如下。当模块更新的时候，通知 index.js。
    src/index.js

    ```
    import React from 'react';
    import ReactDom from 'react-dom';
    import getRouter from './router/router';
    if (module.hot) {
        module.hot.accept();
    }
    ReactDom.render(
        getRouter(), document.getElementById('app'));
    ```

    Q:　请问 webpack-dev-server 与 react-hot-loader 两者的热替换有什么区别？
    A: 区别在于 webpack-dev-server 自己的--hot 模式只能即时刷新页面，但状态保存不住。因为 React 有一些自己语法(JSX)是 HotModuleReplacementPlugin 搞不定的。
    而 react-hot-loader 在--hot 基础上做了额外的处理，来保证状态可以存下来。

    安装依赖
    npm install react-hot-loader@next --save-dev

    根据文档，要做如下几个修改~
    .babelrc 增加 react-hot-loader/babel
    .babelrc

    ```
    {
    "presets": [
        "es2015",
        "react",
        "stage-0"
    ],
    "plugins": [
        "react-hot-loader/babel"
    ]
    }
    ```

    webpack.dev.config.js 入口增加 react-hot-loader/patch
    webpack.dev.config.js
    entry: [
    'react-hot-loader/patch',
    path.join(__dirname, 'src/index.js')
    ]
    src/index.js 修改如下
    src/index.js

    ```
    import React from 'react';
    import ReactDom from 'react-dom';
    import {AppContainer} from 'react-hot-loader';
    import getRouter from './router/router';
    /*初始化*/
    renderWithHotReload(getRouter());
    /*热更新*/
    if (module.hot) {
        module.hot.accept('./router/router', () => {
            const getRouter = require('./router/router').default;
            renderWithHotReload(getRouter());
        });
    }
    function renderWithHotReload(RootElement) {
        ReactDom.render(
            <AppContainer>
                {RootElement}
            </AppContainer>,
            document.getElementById('app')
        )
    }
    ```

9.  文件路径优化
    webpack 提供了一个别名配置，就是我们无论在哪个路径下，引用都可以这样
    import Home from 'pages/Home/Home';
    修改 webpack.dev.config.js，增加别名~
    webpack.dev.config.js

````
    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router')
        }
    }
    ```
````
