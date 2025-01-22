import './index.scss';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { pluckSettings, pluckDock } from './utils';
import storage from './services/storage';
// import { settings as defaultSettings } from './config';
import createStore, { AppState } from './store/createStore';
import { initialState as initialSettingsState } from './store/slices/settingsSlice';
// import analytics from './common/analytics';

import App from './components/App/App';

Promise.all([
  storage.load(),
  new Promise((resolve) => {
    document.addEventListener('DOMContentLoaded', resolve);
  }),
]).then(([data]) => {
  const initialState: Partial<AppState> = {};

  if (!data) {
    // initialState.intro = true;
  } else {
    initialState.settings = {
      ...initialSettingsState,
      ...pluckSettings(data),
    };
    initialState.dock = pluckDock(data);
  }

  const store = createStore(initialState);

  const root = createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
});
