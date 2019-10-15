import './main.styl';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { pluckSettings, pluckDock } from './utils';
import storage from './services/storage';
import { settings } from './config';
import createStore from './store/createStore';
// import analytics from './common/analytics';

import App from './containers/app/App';

Promise.all([
  storage.load(),
  new Promise(resolve => {
    document.addEventListener('DOMContentLoaded', resolve);
  }),
]).then(([data]) => {
  let initialState = {};

  if (!data) {
    initialState.intro = true;
  } else {
    initialState.settings = Object.assign(settings, pluckSettings(data));
    initialState.dock = pluckDock(data);
  }

  const store = createStore(initialState);

  // kick off background service
  store.dispatch({ type: 'WEATHER_BG_SERVICE_START' });
  // save user setting to firebase
  //
  // setTimeout(() => {
  //   analytics.saveSettings(initialState.settings);
  // }, 100);

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
});
