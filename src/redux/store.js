import { createStore, applyMiddleware } from 'redux';
import combineReducers from '@redux/reducers.js';

import promiseMiddleware from './middleware/promiseMiddleware';

let store = createStore(combineReducers, applyMiddleware(promiseMiddleware));

export default store;
