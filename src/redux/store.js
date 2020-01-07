import { createStore } from 'redux';
import combineReducers from '@redux/reducers.js';
let store = createStore(combineReducers);
export default store;
