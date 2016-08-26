import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers';
import chromeStorageMiddleware from './chromeStorageMiddleware';

const logger = createLogger({
  duration: true,
  collapsed: true
});

const middleware = [
  thunk,
  logger,
  chromeStorageMiddleware
];

const createStoreWithMiddleware = applyMiddleware(
  ...middleware
)(createStore);

const reducer = combineReducers({
  ...reducers
});

const createAppStore = (initialState = {}) =>
  createStoreWithMiddleware(reducer, initialState);

export default createAppStore;
