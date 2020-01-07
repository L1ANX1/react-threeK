# REACT - THREE.JS

# https://github.com/brickspert/blog/issues/1

1.  init 项目基本信息
    npm init(生成 package.json)
2.  webpack
    a) npm install --save-dev webpack@3
    Q: 什么时候用--save-dev，什么时候用--save？A: --save-dev 是你开发时候依赖的东西，--save 是你发布之后还依赖的东西。
    b) type nul.> webpack.dev.config.js (type nul.> === touch)
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
    npm install webpack-dev-server@2 --save-dev
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
    npm install react-hot-loader --save-dev

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

    ```
    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router')
        }
    }
    ```

10. Redux
    先安装 redux
    npm install --save redux

    初始化目录结构
    cd src
    mkdir redux
    cd redux
    mkdir actions
    mkdir reducers
    type nul.> reducers.js
    type nul.> store.js
    type nul.> actions/counter.js
    type nul.> reducers/counter.js

    先来写 action 创建函数。通过 action 创建函数，可以创建 action~
    src/redux/actions/counter.js

    ```
    /*action*/
    export const INCREMENT = "counter/INCREMENT";
    export const DECREMENT = "counter/DECREMENT";
    export const RESET = "counter/RESET";
    export function increment() {
        return {type: INCREMENT}
    }
    export function decrement() {
        return {type: DECREMENT}
    }
    export function reset() {
        return {type: RESET}
    }
    ```

    再来写 reducer,reducer 是一个纯函数，接收 action 和旧的 state,生成新的 state.
    src/redux/reducers/counter.js

    ```
    import {INCREMENT, DECREMENT, RESET} from '../actions/counter';
    /** 初始化state */
    const initState = {
        count: 0
    };
    /** reducer */
    export default function reducer(state = initState, action) {
        switch (action.type) {
            case INCREMENT:
                return {
                    count: state.count + 1
                };
            case DECREMENT:
                return {
                    count: state.count - 1
                };
            case RESET:
                return {count: 0};
            default:
                return state
        }
    }
    ```

    一个项目有很多的 reducers,我们要把他们整合到一起
    src/redux/reducers.js

    ```
    import counter from './reducers/counter';
    export default function combineReducers(state = {}, action) {
        return {
            counter: counter(state.counter, action)
        }
    }
    ```

    到这里，我们必须再理解下一句话。
    reducer 就是纯函数，接收 state 和 action，然后返回一个新的 state。
    看看上面的代码，无论是 combineReducers 函数也好，还是 reducer 函数也好，都是接收 state 和 action，
    返回更新后的 state。区别就是 combineReducers 函数是处理整棵树，reducer 函数是处理树的某一点。

    接下来，我们要创建一个 store。
    前面我们可以使用 action 来描述“发生了什么”，使用 action 创建函数来返回 action。
    还可以使用 reducers 来根据 action 更新 state 。
    那我们如何提交 action？提交的时候，怎么才能触发 reducers 呢？
    store 就是把它们联系到一起的对象。store 有以下职责：
    维持应用的 state；
    提供 getState() 方法获取 state；
    提供 dispatch(action) 触发 reducers 方法更新 state；
    通过 subscribe(listener) 注册监听器;
    通过 subscribe(listener) 返回的函数注销监听器。
    src/redux/store.js

    ```
    import {createStore} from 'redux';
    import combineReducers from './reducers.js';
    let store = createStore(combineReducers);
    export default store;
    ```

    到现在为止，我们已经可以使用 redux 了~
    下面我们就简单的测试下
    cd src
    cd redux
    type nul.> testRedux.js
    src/redux/testRedux.js

    ```
    import {increment, decrement, reset} from './actions/counter';
    import store from './store';
    // 打印初始状态
    console.log(store.getState());
    // 每次 state 更新时，打印日志
    // 注意 subscribe() 返回一个函数用来注销监听器
    let unsubscribe = store.subscribe(() =>
        console.log(store.getState())
    );
    // 发起一系列 action
    store.dispatch(increment());
    store.dispatch(decrement());
    store.dispatch(reset());
    // 停止监听 state 更新
    unsubscribe();
    ```

    该测试，说明 redux 和 react 没关系
    redux 的数据流，看看这里。
    http://cn.redux.js.org/docs/basics/DataFlow.html -调用 store.dispatch(action)提交 action。-
    -redux store 调用传入的 reducer 函数。把当前的 state 和 action 传进去。- -根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。-
    -Redux store 保存了根 reducer 返回的完整 state 树。-

    webpack.dev.config.js 路径别名增加一下，后面好写了。
    webpack.dev.config.js

    ```
    alias: {
        ...
        @actions: path.join(__dirname, 'src/redux/actions'),
        @reducers: path.join(__dirname, 'src/redux/reducers'),
        @redux: path.join(__dirname, 'src/redux')
    }
    ```

    把前面的相对路径都改改。
    下面我们开始搭配 react 使用。
    写一个 Counter 页面
    cd src/pages
    mkdir Counter
    type nul.> Counter/Counter.js

    src/pages/Counter/Counter.js

    ```
    import React, {Component} from 'react';
    export default class Counter extends Component {
        render() {
            return (
                <div>
                    <div>当前计数为(显示redux计数)</div>
                    <button onClick={() => {
                        console.log('调用自增函数');
                    }}>自增
                    </button>
                    <button onClick={() => {
                        console.log('调用自减函数');
                    }}>自减
                    </button>
                    <button onClick={() => {
                        console.log('调用重置函数');
                    }}>重置
                    </button>
                </div>
            )
        }
    }
    ```

    修改路由，增加 Counter
    src/router/router.js

    ```
    import React from 'react';
    import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
    import Home from 'pages/Home/Home';
    import Page1 from 'pages/Page1/Page1';
    import Counter from 'pages/Counter/Counter';
    const getRouter = () => (
        <Router>
            <div>
                <ul>
                    <li><Link to="/">首页</Link></li>
                    <li><Link to="/page1">Page1</Link></li>
                    <li><Link to="/counter">Counter</Link></li>
                </ul>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/page1" component={Page1}/>
                    <Route path="/counter" component={Counter}/>
                </Switch>
            </div>
        </Router>
    );
    export default getRouter;
    ```

    npm start 看看效果。
    下一步，我们让 Counter 组件和 Redux 联合起来。使 Counter 能获得到 Redux 的 state，并且能发射 action。
    当然我们可以使用刚才测试 testRedux 的方法，手动监听~手动引入 store~但是这肯定很麻烦哦。
    react-redux 提供了一个方法 connect。
    容器组件就是使用 store.subscribe() 从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。你可以手工来开发容器组件，但建议使用 React Redux 库的 connect() 方法来生成，这个方法做了性能优化来避免很多不必要的重复渲染。
    connect 接收两个参数，一个 mapStateToProps,就是把 redux 的 state，转为组件的 Props，还有一个参数是 mapDispatchToprops,
    就是把发射 actions 的方法，转为 Props 属性函数。
    先来安装 react-redux
    npm install --save react-redux
    src/pages/Counter/Counter.js

    ```
    import React, {Component} from 'react';
    import {increment, decrement, reset} from 'actions/counter';
    import {connect} from 'react-redux';
    class Counter extends Component {
        render() {
            return (
                <div>
                    <div>当前计数为{this.props.counter.count}</div>
                    <button onClick={() => this.props.increment()}>自增
                    </button>
                    <button onClick={() => this.props.decrement()}>自减
                    </button>
                    <button onClick={() => this.props.reset()}>重置
                    </button>
                </div>
            )
        }
    }
    const mapStateToProps = (state) => {
        return {
            counter: state.counter
        }
    };
    const mapDispatchToProps = (dispatch) => {
        return {
            increment: () => {
                dispatch(increment())
            },
            decrement: () => {
                dispatch(decrement())
            },
            reset: () => {
                dispatch(reset())
            }
        }
    };
    export default connect(mapStateToProps, mapDispatchToProps)(Counter);
    ```

    下面我们要传入 store
    所有容器组件都可以访问 Redux store，所以可以手动监听它。一种方式是把它以 props 的形式传入到所有容器组件中。但这太麻烦了，因为必须要用 store 把展示组件包裹一层，仅仅是因为恰好在组件树中渲染了一个容器组件。
    建议的方式是使用指定的 React Redux 组件 来 魔法般的 让所有容器组件都可以访问 store，而不必显示地传递它。只需要在渲染根组件时使用即可。
    src/index.js

    ```
    import React from 'react';
    import ReactDom from 'react-dom';
    import {AppContainer} from 'react-hot-loader';
    import {Provider} from 'react-redux';
    import store from './redux/store';

    import getRouter from 'router/router';

    /*初始化*/
    renderWithHotReload(getRouter());

    /*热更新*/
    if (module.hot) {
        module.hot.accept('./router/router', () => {
            const getRouter = require('@router/router').default;
            renderWithHotReload(getRouter());
        });
    }

    function renderWithHotReload(RootElement) {
        ReactDom.render(
            <AppContainer>
                <Provider store={store}>
                    {RootElement}
                </Provider>
            </AppContainer>,
            document.getElementById('app')
        )
    }
    ```

    到这里我们就可以执行 npm start，打开 localhost:8080/counter 看效果了。


    异步action
    调用一个异步get请求去后台请求数据：
    -请求开始的时候，界面转圈提示正在加载。isLoading置为true。-
    -请求成功，显示数据。isLoading置为false,data填充数据。-
    -请求失败，显示失败。isLoading置为false，显示错误信息。-
    下面，我们以向后台请求用户基本信息为例。
    我们先创建一个user.json，等会请求用，相当于后台的API接口。
    cd dist
    mkdir api
    cd api
    type nul.> user.json
    dist/api/user.json
    {
    "name": "brickspert",
    "intro": "please give me a star"
    }
    创建必须的action创建函数。
    cd src/redux/actions
    type nul.> userInfo.js
    src/redux/actions/userInfo.js

    ```
    export const GET_USER_INFO_REQUEST = "userInfo/GET_USER_INFO_REQUEST";
    export const GET_USER_INFO_SUCCESS = "userInfo/GET_USER_INFO_SUCCESS";
    export const GET_USER_INFO_FAIL = "userInfo/GET_USER_INFO_FAIL";
    function getUserInfoRequest() {
        return {
            type: GET_USER_INFO_REQUEST
        }
    }
    function getUserInfoSuccess(userInfo) {
        return {
            type: GET_USER_INFO_SUCCESS,
            userInfo: userInfo
        }
    }
    function getUserInfoFail() {
        return {
            type: GET_USER_INFO_FAIL
        }
    }
    ```

    创建了请求中，请求成功，请求失败三个action创建函数。
    创建reducer
    再强调下，reducer是根据state和action生成新state的纯函数。
    cd src/redux/reducers
    type nul.> userInfo.js
    src/redux/reducers/userInfo.js
    ```
    import {GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL} from '@actions/userInfo';
    const initState = {
        isLoading: false,
        userInfo: {},
        errorMsg: ''
    };
    export default function reducer(state = initState, action) {
        switch (action.type) {
            case GET_USER_INFO_REQUEST:
                return {
                    ...state,
                    isLoading: true,
                    userInfo: {},
                    errorMsg: ''
                };
            case GET_USER_INFO_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    userInfo: action.userInfo,
                    errorMsg: ''
                };
            case GET_USER_INFO_FAIL:
                return {
                    ...state,
                    isLoading: false,
                    userInfo: {},
                    errorMsg: '请求错误'
                };
            default:
                return state;
        }
    }
    ```

    组合reducer
    src/redux/reducers.js

    ```
    import counter from '@reducers/counter';
    import userInfo from '@reducers/userInfo';
    export default function combineReducers(state = {}, action) {
        return {
            counter: counter(state.counter, action),
            userInfo: userInfo(state.userInfo, action)
        }
    }
    ```

    现在有了action，有了reducer，我们就需要调用把action里面的三个action函数和网络请求结合起来。
    请求中 dispatch getUserInfoRequest
    请求成功 dispatch getUserInfoSuccess
    请求失败 dispatch getUserInfoFail
    src/redux/actions/userInfo.js增加
    ```
    export function getUserInfo() {
        return function (dispatch) {
            dispatch(getUserInfoRequest());
            return fetch('http://localhost:8080/api/user.json')
                .then((response => {
                    return response.json()
                }))
                .then((json) => {
                        dispatch(getUserInfoSuccess(json))
                    }
                ).catch(
                    () => {
                        dispatch(getUserInfoFail());
                    }
                )
        }
    }
    ```

    让action创建函数除了返回action对象外，还可以返回函数，我们需要引用redux-thunk。
    npm install --save redux-thunk
    这里涉及到redux中间件middleware。
    简单的说，中间件就是action在到达reducer，先经过中间件处理。我们之前知道reducer能处理的action只有这样的{type:xxx}，所以我们使用中间件来处理
    函数形式的action，把他们转为标准的action给reducer。这是redux-thunk的作用。
    使用redux-thunk中间件
    我们来引入redux-thunk中间件
    src/redux/store.js

    ```
    import {createStore, applyMiddleware} from 'redux';
    import thunkMiddleware from 'redux-thunk';
    import combineReducers from './reducers.js';
    let store = createStore(combineReducers, applyMiddleware(thunkMiddleware));
    export default store;
    ```

    到这里，redux这边OK了，我们来写个组件验证下。
    cd src/pages
    mkdir UserInfo
    cd UserInfo
    type nul.> UserInfo.js
    src/pages/UserInfo/UserInfo.js

    ```
    import React, {Component} from 'react';
    import {connect} from 'react-redux';
    import {getUserInfo} from "@actions/userInfo";
    class UserInfo extends Component {
        render() {
            const {userInfo, isLoading, errorMsg} = this.props.userInfo;
            return (
                <div>
                    {
                        isLoading ? '请求信息中......' :
                            (
                                errorMsg ? errorMsg :
                                    <div>
                                        <p>用户信息：</p>
                                        <p>用户名：{userInfo.name}</p>
                                        <p>介绍：{userInfo.intro}</p>
                                    </div>
                            )
                    }
                    <button onClick={() => this.props.getUserInfo()}>请求用户信息</button>
                </div>
            )
        }
    }
    export default connect((state) => ({userInfo: state.userInfo}), {getUserInfo})(UserInfo);
    ```
    connect参数写法不一样了，mapStateToProps函数用了es6简写，mapDispatchToProps用了react-redux提供的简单写法。
    增加路由
    src/router/router.js
    ```
    import React from 'react';

    import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

    import Home from '@pages/Home/Home';
    import Page1 from '@pages/Page1/Page1';
    import Counter from '@pages/Counter/Counter';
    import UserInfo from '@pages/UserInfo/UserInfo';

    const getRouter = () => (
        <Router>
            <div>
                <ul>
                    <li><Link to="/">首页</Link></li>
                    <li><Link to="/page1">Page1</Link></li>
                    <li><Link to="/counter">Counter</Link></li>
                    <li><Link to="/userinfo">UserInfo</Link></li>
                </ul>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/page1" component={Page1}/>
                    <Route path="/counter" component={Counter}/>
                    <Route path="/userinfo" component={UserInfo}/>
                </Switch>
            </div>
        </Router>
    );
    export default getRouter;
    ```
