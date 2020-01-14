import { createStore, applyMiddleware } from 'redux';
import combineReducers from '@redux/reducers.js';

import promiseMiddleware from './middleware/promiseMiddleware';

let store = createStore(combineReducers, applyMiddleware(promiseMiddleware));

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextCombineReducers = require('./reducers').default;
    store.replaceReducer(nextCombineReducers);
  });
}

export default store;
