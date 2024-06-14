import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import middleware from './middleware';

let middlewares = [thunk, ...middleware];

const logger = createLogger({
  duration: true,
  collapsed: true,
});

if (ENV === 'development') middlewares.push(logger);

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const reducer = combineReducers({
  ...reducers,
});

const createAppStore = (initialState = {}) => createStoreWithMiddleware(reducer, initialState);

export default createAppStore;
