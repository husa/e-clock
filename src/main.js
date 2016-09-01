import './main.styl';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {pluckSettings, pluckDock} from './common/utils';
import storage from './common/storage';
import {settings} from './config';
import createStore from './store/createStore';

import App from './containers/app/App';

Promise.all([
  storage.load(),
  new Promise(resolve => {
    document.addEventListener('DOMContentLoaded', resolve);
  })
]).then(([data]) => {
  let initialState = {};

  if (!data) {
    initialState.intro = true;
  } else {
    initialState.settings = Object.assign(
      settings,
      pluckSettings(data)
    );
    initialState.dock = pluckDock(data);
  }

  const store = createStore(initialState);

  render(
    <Provider store={store}>
      <App />
    </Provider>
  , document.getElementById('root'));
});