// import { createStore, combineReducers, applyMiddleware, Middleware } from 'redux';
// import { createLogger } from 'redux-logger';
// import { thunk } from 'redux-thunk';
//
// import reducers from '../reducers';
// import middleware from './middleware';
//
// const middlewares = [thunk, ...middleware];
//
// const logger = createLogger({
//   duration: true,
//   collapsed: true,
// });
//
// if (ENV === 'development') middlewares.push(logger);
//
// const createStoreWithMiddleware = applyMiddleware(...(middlewares as Middleware[]))(createStore);
//
// const reducer = combineReducers({
//   ...reducers,
// });
//
// const createAppStore = (initialState = {}) => createStoreWithMiddleware(reducer, initialState);
//
// export default createAppStore;
import { configureStore } from '@reduxjs/toolkit';
import settingsReducer, { SettingsState } from './slices/settingsSlice';
import dockReducer, { DockState } from './slices/dockSlice';

export type AppState = {
  settings: SettingsState;
  dock: DockState;
};

const createAppStore = (initialState: Partial<AppState> = {}) =>
  configureStore({
    reducer: {
      settings: settingsReducer,
      dock: dockReducer,
    },
    preloadedState: initialState,
  });

export default createAppStore;

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// type B = ReturnType<typeof createAppStore>;V
// type A = ReturnType<B>;
// export type RootState = ReturnType<A['getState']>;
// export type AppDispatch = typeof store.dispatch;
