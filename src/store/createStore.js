import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import chromeStorageMiddleware from './chromeStorageMiddleware';
import analyticsMiddleware from './analyticsMiddleware';

const middleware = [
  thunk,
  chromeStorageMiddleware,
  analyticsMiddleware
];

const logger = createLogger({
  duration: true,
  collapsed: true
});

if (ENV === 'develop') middleware.push(logger);

const createStoreWithMiddleware = applyMiddleware(
  ...middleware
)(createStore);

const reducer = combineReducers({
  ...reducers
});

const createAppStore = (initialState = {}) =>
  createStoreWithMiddleware(reducer, initialState);

export default createAppStore;
