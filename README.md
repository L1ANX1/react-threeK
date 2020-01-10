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
     entry: path.join(__dirname, 'src/index.js'),
    /_输出到 dist 文件夹，输出文件名字为 bundle.min.js_/
     output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    }
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

    11. 异步 action
        调用一个异步 get 请求去后台请求数据： -请求开始的时候，界面转圈提示正在加载。isLoading 置为 true。- -请求成功，显示数据。isLoading 置为 false,data 填充数据。- -请求失败，显示失败。isLoading 置为 false，显示错误信息。-
        下面，我们以向后台请求用户基本信息为例。
        我们先创建一个 user.json，等会请求用，相当于后台的 API 接口。
        cd dist
        mkdir api
        cd api
        type nul.> user.json
        dist/api/user.json
        {
        "name": "brickspert",
        "intro": "please give me a star"
        }
        创建必须的 action 创建函数。
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

    创建了请求中，请求成功，请求失败三个 action 创建函数。
    创建 reducer
    再强调下，reducer 是根据 state 和 action 生成新 state 的纯函数。
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

    组合 reducer
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

    现在有了 action，有了 reducer，我们就需要调用把 action 里面的三个 action 函数和网络请求结合起来。
    请求中 dispatch getUserInfoRequest
    请求成功 dispatch getUserInfoSuccess
    请求失败 dispatch getUserInfoFail
    src/redux/actions/userInfo.js 增加

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

    让 action 创建函数除了返回 action 对象外，还可以返回函数，我们需要引用 redux-thunk。
    npm install --save redux-thunk
    这里涉及到 redux 中间件 middleware。
    简单的说，中间件就是 action 在到达 reducer，先经过中间件处理。我们之前知道 reducer 能处理的 action 只有这样的{type:xxx}，所以我们使用中间件来处理
    函数形式的 action，把他们转为标准的 action 给 reducer。这是 redux-thunk 的作用。
    使用 redux-thunk 中间件
    我们来引入 redux-thunk 中间件
    src/redux/store.js

    ```
    import {createStore, applyMiddleware} from 'redux';
    import thunkMiddleware from 'redux-thunk';
    import combineReducers from './reducers.js';
    let store = createStore(combineReducers, applyMiddleware(thunkMiddleware));
    export default store;
    ```

    到这里，redux 这边 OK 了，我们来写个组件验证下。
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

    connect 参数写法不一样了，mapStateToProps 函数用了 es6 简写，mapDispatchToProps 用了 react-redux 提供的简单写法。
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

    12. combinReducers 优化
        redux 提供了一个 combineReducers 函数来合并 reducer，不用我们自己合并哦。写起来简单，但是意思和我们
        自己写的 combinReducers 也是一样的。
        src/redux/reducers.js

    ```
    import {combineReducers} from "redux";
    import counter from 'reducers/counter';
    import userInfo from 'reducers/userInfo';
    export default combineReducers({
        counter,
        userInfo
    });
    ```

    13. devtool 优化
        现在我们发现一个问题，代码哪里写错了，浏览器报错只报在 build.js 第几行。
        这让我们分析错误无从下手。增加 webpack 配置 devtool！
        webpack.dev.config.js 增加
        devtool: 'inline-source-map'
        同时，我们在 srouce 里面能看到我们写的代码，也能打断点调试哦~

    14. 编译 css
        先说这里为什么不用 scss，因为 Windows 使用 node-sass，需要先安装 Microsoft Windows SDK for Windows 7 and .NET Framework 4。
        我怕有些人 copy 这份代码后，没注意，运行不起来。所以这里不用 scss 了，如果需要，自行编译哦。
        npm install css-loader style-loader --save-dev
        css-loader 使你能够使用类似@import 和 url(...)的方法实现 require()的功能；
        style-loader 将所有的计算后的样式加入页面中； 二者组合在一起使你能够把样式表嵌入 webpack 打包后的 JS 文件中。
        webpack.dev.config.js rules 增加

    ```
    {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
    }
    ```

    我们用 Page1 页面来测试下
    cd src/pages/Page1
    type nul.> Page1.css
    src/pages/Page1/Page1.css

    ```
    .page-box {
        border: 1px solid red;
    }
    src/pages/Page1/Page1.js
    ```

    ```
    import React, {Component} from 'react';
    import './Page1.css';
    export default class Page1 extends Component {
        render() {
            return (
                <div className="page-box">
                    this is page1~
                </div>
            )
        }
    }
    ```

    npm start 查看。

    15. 编译图片
        npm install --save-dev url-loader file-loader
        webpack.dev.config.js rules 增加

    ```
    {
        test: /\.(png|jpg|gif)$/,
        use: [{
            loader: 'url-loader',
            options: {
                limit: 8192
            }
        }]
    }
    ```

    options limit 8192 意思是，小于等于 8K 的图片会被转成 base64 编码，直接插入 HTML 中，减少 HTTP 请求。
    我们来用 Page1 测试下
    cd src/pages/Page1
    mkdir images
    给 images 文件夹放一个图片。
    修改代码，引用图片
    src/pages/Page1/Page1.js

    ```
    import React, {Component} from 'react';
    import './Page1.css';
    import image from './images/brickpsert.jpg';
    export default class Page1 extends Component {
        render() {
            return (
                <div className="page-box">
                    this is page1~
                    <img src={image}/>
                </div>
            )
        }
    }
    ```

    16. 按需加载
        为什么要实现按需加载？
        我们现在看到，打包完后，所有页面只生成了一个 build.js,当我们首屏加载的时候，就会很慢。因为他也下载了别的页面的 js 了哦。
        如果每个页面都打包了自己单独的 JS，在进入自己页面的时候才加载对应的 js，那首屏加载就会快很多哦。
        在 react-router 2.0 时代， 按需加载需要用到的最关键的一个函数，就是 require.ensure()，它是按需加载能够实现的核心。
        在 4.0 版本，官方放弃了这种处理按需加载的方式，选择了一个更加简洁的处理方式。
        传送门 [https://reacttraining.com/react-router/web/guides/code-splitting]
        根据官方示例
        npm install bundle-loader --save-dev
        新建 bundle.js
        cd src/router
        type nul.> Bundle.js
        src/router/Bundle.js

    ```
    import React, {Component} from 'react'
    class Bundle extends Component {
        state = {
            // short for "module" but that's a keyword in js, so "mod"
            mod: null
        };
        componentWillMount() {
            this.load(this.props)
        }
        componentWillReceiveProps(nextProps) {
            if (nextProps.load !== this.props.load) {
                this.load(nextProps)
            }
        }
        load(props) {
            this.setState({
                mod: null
            });
            props.load((mod) => {
                this.setState({
                    // handle both es imports and cjs
                    mod: mod.default ? mod.default : mod
                })
            })
        }
        render() {
            return this.props.children(this.state.mod)
        }
    }
    export default Bundle;
    ```

    改造路由器
    src/router/router.js

    ```
    import React from 'react';
    import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
    import Bundle from './Bundle';

    import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
    import Page1 from 'bundle-loader?lazy&name=page1!pages/Page1/Page1';
    import Counter from 'bundle-loader?lazy&name=counter!pages/Counter/Counter';
    import UserInfo from 'bundle-loader?lazy&name=userInfo!pages/UserInfo/UserInfo';

    const Loading = function () {
        return <div>Loading...</div>
    };
    const createComponent = (component) => (props) => (
        <Bundle load={component}>
            {
                (Component) => Component ? <Component {...props} /> : <Loading/>
            }
        </Bundle>
    );
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
                    <Route exact path="/" component={createComponent(Home)}/>
                    <Route path="/page1" component={createComponent(Page1)}/>
                    <Route path="/counter" component={createComponent(Counter)}/>
                    <Route path="/userinfo" component={createComponent(UserInfo)}/>
                </Switch>
            </div>
        </Router>
    );
    export default getRouter;
    ```

    现在你可以 npm start，打开浏览器，看是不是进入新的页面，都会加载自己的 JS 的~
    但是你可能发现，名字都是 0.bundle.js 这样子的，这分不清楚是哪个页面的 js 呀！
    我们修改下 webpack.dev.config.js,加个 chunkFilename。chunkFilename 是除了 entry 定义的入口 js 之外的 js~
    output: {
    path: path.join(\_\_dirname, './dist'),
    filename: 'bundle.js',
    chunkFilename: '[name].js'
    }
    现在你运行发现名字变成 home.js,这样的了。棒棒哒！
    那么问题来了 home 是在哪里设置的？webpack 怎么知道他叫 home？
    其实在这里我们定义了，router.js 里面
    import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
    看到没。这里有个 name=home。

    17. Caching
        想象一下这个场景~。用户第一次访问首页，下载了 home.js，第二次访问又下载了 home.js~
        这肯定不行呀，所以我们一般都会做一个缓存，用户下载一次 home.js 后，第二次就不下载了。
        有一天，我们更新了 home.js，但是用户不知道呀，用户还是使用本地旧的 home.js。出问题了~
        怎么解决？每次代码更新后，打包生成的名字不一样。比如第一次叫 home.a.js，第二次叫 home.b.js。
        文档[https://webpack.docschina.org/guides/caching]
        我们照着文档来
        webpack.dev.config.js

    ```
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
    }
    ```

    每次打包都用增加 hash~
    现在我们试试，是不是修改了文件，打包后相应的文件名字就变啦？
    但是你可能发现了，网页打开报错了~因为你 dist/index.html 里面引用 js 名字还是 bundle.js 老名字啊,改成新的名字就可以啦。
    啊~那岂不是我每次编译打包，都得去改一下 js 名字？欲知后事如何，且看下节分享。

    18. HtmlWebpackPlugin
        这个插件，每次会自动把 js 插入到你的模板 index.html 里面去。
        npm install html-webpack-plugin --save-dev
        新建模板 index.html
        cd src
        type nul.> index.html
        src/index.html

    ```
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
    </head>
    <body>
    <div id="app"></div>
    </body>
    </html>
    ```

    修改 webpack.dev.config.js，增加 plugin

    ```
    var HtmlWebpackPlugin = require('html-webpack-plugin');

        plugins: [new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        })],
    ```

    npm start 运行项目，看看是不是能正常访问啦。~
    说明一下：npm start 打包后的文件存在内存中，你看不到的。~ 你可以把遗留 dist/index.html 删除掉了。

    19. 提取公共代码
        想象一下，我们的主文件，原来的 bundle.js 里面是不是包含了 react,redux,react-router 等等。这些代码？？这些代码基本上不会改变的。但是，他们合并在 bundle.js 里面，每次项目发布，重新请求 bundle.js 的时候，相当于重新请求了 react 等这些公共库。浪费了~
        我们把 react 这些不会改变的公共库提取出来，用户缓存下来。从此以后，用户再也不用下载这些库了，无论是否发布项目。
        webpack 文档给了教程[https://webpack.docschina.org/guides/caching#-extracting-boilerplate-]
        webpack.dev.config.js

    ```
    var webpack = require('webpack');

    entry: {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, 'src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    }

        /*plugins*/
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
    ```

    把 react 等库生成打包到 vendor.hash.js 里面去。
    但是你现在可能发现编译生成的文件 app.[hash].js 和 vendor.[hash].js 生成的 hash 一样的，这里是个问题，因为呀，你每次修改代码,都会导致 vendor.[hash].js 名字改变，那我们提取出来的意义也就没了。其实文档上写的很清楚，

    ```
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[hash].js', //这里应该用chunkhash替换hash
        chunkFilename: '[name].[chunkhash].js'
    }
    ```

    但是无奈，如果用 chunkhash，会报错。和 webpack-dev-server --hot 不兼容，具体看这里。
    现在我们在配置开发版配置文件，就向 webpack-dev-server 妥协，因为我们要用他。问题先放这里，等会我们配置正式版 webpack.config.js 的时候要解决这个问题。

    20. Production 生产坏境构建
        开发环境(development)和生产环境(production)的构建目标差异很大。在开发环境中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置。
        文档[https://webpack.docschina.org/guides/production]
        type nul.> webpack.config.js
        在 webpack.dev.config.js 的基础上先做以下几个修改~

    先删除 webpack-dev-server 相关的东西~
    devtool 的值改成 cheap-module-source-map
    刚才说的 hash 改成 chunkhash
    webpack.config.js

    ```
    const path = require('path');
    var HtmlWebpackPlugin = require('html-webpack-plugin');
    var webpack = require('webpack');
    module.exports = {
        devtool: 'cheap-module-source-map',
        entry: {
            app: [
                path.join(__dirname, 'src/index.js')
            ],
            vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
        },
        output: {
            path: path.join(__dirname, './dist'),
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name].[chunkhash].js'
        },
        module: {
            rules: [{
                test: /\.js$/,
                use: ['babel-loader'],
                include: path.join(__dirname, 'src')
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.join(__dirname, 'src/index.html')
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
            })
        ],

        resolve: {
            alias: {
                pages: path.join(__dirname, 'src/pages'),
                component: path.join(__dirname, 'src/component'),
                router: path.join(__dirname, 'src/router'),
                actions: path.join(__dirname, 'src/redux/actions'),
                reducers: path.join(__dirname, 'src/redux/reducers')
            }
        }
    };
    ```

    在 package.json 增加打包脚本
    "build":"webpack --config webpack.config.js"
    然后执行 npm run build~看看 dist 文件夹是不是生成了我们发布要用的所有文件哦？
    接下来我们还是要优化正式版配置文件~

    21. 文件压缩
        webpack 使用 UglifyJSPlugin 来压缩生成的文件。
        npm i --save-dev uglifyjs-webpack-plugin@1
        webpack.config.js

    ```
    const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

    module.exports = {
    plugins: [
        new UglifyJSPlugin()
    ]
    }
    ```

    npm run build 发现打包文件大小减小了好多。

    22. 指定环境
        许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容。例如，当不处于生产环境中时，某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。其实，当使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。我们可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量：
        webpack.config.js

    ```
    module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
    }
    ```

    npm run build 后发现 vendor.[hash].js 又变小了。

    23. 优化缓存
        刚才我们把[name].[hash].js 变成[name].[chunkhash].js 后，npm run build 后，
        发现 app.xxx.js 和 vendor.xxx.js 不一样了哦。
        但是现在又有一个问题了。
        你随便修改代码一处，例如 Home.js，随便改变个字，你发现 home.xxx.js 名字变化的同时，
        vendor.xxx.js 名字也变了。这不行啊。这和没拆分不是一样一样了吗？我们本意是 vendor.xxx.js
        名字永久不变，一直缓存在用户本地的。
        官方文档推荐了一个插件 HashedModuleIdsPlugin

    ```
        plugins: [
            new webpack.HashedModuleIdsPlugin()
        ]
    ```

    还要加一个 runtime 代码抽取，

    ```
    new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
    })
    ```

    解释[https://webpack.docschina.org/concepts/manifest]
    注意，引入顺序在这里很重要。CommonsChunkPlugin 的 'vendor' 实例，必须在 'runtime' 实例之前引入。

    24. public path
        想象一个场景，我们的静态文件放在了单独的静态服务器上去了，那我们打包的时候，如何让静态文件的链接定位到静态服务器呢？
        看文档[https://webpack.docschina.org/guides/public-path]
        webpack.config.js output 中增加一个 publicPath，我们当前用/，相对于当前路径，如果你要改成别的 url，就改这里就好了。

    ```
        output: {
            publicPath : '/'
        }
    ```

    25. 打包优化
        你现在打开 dist，是不是发现好多好多文件，每次打包后的文件在这里混合了？我们希望每次打包前自动清理下 dist 文件。
        npm install clean-webpack-plugin@1 --save-dev
        webpack.config.js

    ```
    const CleanWebpackPlugin = require('clean-webpack-plugin');

    plugins: [
        new CleanWebpackPlugin(['dist'])
    ]
    ```

    现在 npm run build 试试，是不是之前的都清空了。当然我们之前的 api 文件夹也被清空了，不过没关系哦~本来就是测试用的。

    26. 抽取 css
        目前我们的 css 是直接打包进 js 里面的，我们希望能单独生成 css 文件。
        我们使用 extract-text-webpack-plugin 来实现。
        npm install --save-dev extract-text-webpack-plugin
        webpack.config.js

    ```
    const ExtractTextPlugin = require("extract-text-webpack-plugin");

    module.exports = {
    module: {
        rules: [
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
            })
        }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[contenthash:5].css',
            allChunks: true
        })
    ]
    }
    ```

    npm run build 后发现单独生成了 css 文件哦

    27. 使用 axios 和 middleware 优化 API 请求
        先安装下 axios[https://github.com/axios/axios]
        npm install --save axios
        我们之前项目的一次 API 请求是这样写的哦~
        action 创建函数是这样的。比我们现在写的 fetch 简单多了。

    ```
    export function getUserInfo() {
        return {
            types: [GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL],
            promise: client => client.get(`http://localhost:8080/api/user.json`)
            afterSuccess:(dispatch,getState,response)=>{
                /*请求成功后执行的函数*/
            },
            otherData:otherData
        }
    }
    ```

    然后在 dispatch(getUserInfo())后，通过 redux 中间件来处理请求逻辑。
    中间件的教程[http://cn.redux.js.org/docs/advanced/Middleware.html]
    我们想想中间件的逻辑

    - 请求前 dispatch REQUEST 请求。-
    - 成功后 dispatch SUCCESS 请求，如果定义了 afterSuccess()函数，调用它。-
    - 失败后 dispatch FAIL 请求。-
      cd src/redux
      mkdir middleware
      cd middleware
      touch promiseMiddleware.js

    src/redux/middleware/promiseMiddleware.js

    ```
    import axios from 'axios';
    export default  store => next => action => {
        const {dispatch, getState} = store;
        /*如果dispatch来的是一个function，此处不做处理，直接进入下一级*/
        if (typeof action === 'function') {
            action(dispatch, getState);
            return;
        }
        /*解析action*/
        const {
            promise,
            types,
            afterSuccess,
            ...rest
        } = action;

        /*没有promise，证明不是想要发送ajax请求的，就直接进入下一步啦！*/
        if (!action.promise) {
            return next(action);
        }

        /*解析types*/
        const [REQUEST,
            SUCCESS,
            FAILURE] = types;

        /*开始请求的时候，发一个action*/
        next({
            ...rest,
            type: REQUEST
        });
        /*定义请求成功时的方法*/
        const onFulfilled = result => {
            next({
                ...rest,
                result,
                type: SUCCESS
            });
            if (afterSuccess) {
                afterSuccess(dispatch, getState, result);
            }
        };
        /*定义请求失败时的方法*/
        const onRejected = error => {
            next({
                ...rest,
                error,
                type: FAILURE
            });
        };

        return promise(axios).then(onFulfilled, onRejected).catch(error => {
            console.error('MIDDLEWARE ERROR:', error);
            onRejected(error)
        })
    }
    ```

    修改 src/redux/store.js 来应用这个中间件

    ```
    import {createStore, applyMiddleware} from 'redux';
    import combineReducers from './reducers.js';

    import promiseMiddleware from './middleware/promiseMiddleware'

    let store = createStore(combineReducers, applyMiddleware(promiseMiddleware));

    export default store;
    ```

    修改 src/redux/actions/userInfo.js

    ```
    export const GET_USER_INFO_REQUEST = "userInfo/GET_USER_INFO_REQUEST";
    export const GET_USER_INFO_SUCCESS = "userInfo/GET_USER_INFO_SUCCESS";
    export const GET_USER_INFO_FAIL = "userInfo/GET_USER_INFO_FAIL";

    export function getUserInfo() {
        return {
            types: [GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL],
            promise: client => client.get(`http://localhost:8080/api/user.json`)
        }
    }
    ```

    修改 src/redux/reducers/userInfo.js

    ```
            case GET_USER_INFO_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    userInfo: action.result.data,
                    errorMsg: ''
                };
    ```

    action.userInfo 修改成了 action.result.data。你看中间件，请求成功，会给 action 增加一个 result 字段来存储响应结果哦~不用手动传了。
    npm start 看看我们的网络请求是不是正常哦。
