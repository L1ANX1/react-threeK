// document.getElementById('app').innerHTML = 'Webpack works';
/*使用es6的箭头函数*/
// var func = str => {
//   document.getElementById('app').innerHTML = str;
// };
// func('我现在在使用Babel!');
// import React from 'react';
// import ReactDom from 'react-dom';
// import Hello from './component/Hello/Hello';
// ReactDom.render(<Hello />, document.getElementById('app'));
import React from 'react';
import ReactDom from 'react-dom';
import getRouter from './router/router';
ReactDom.render(getRouter(), document.getElementById('app'));
