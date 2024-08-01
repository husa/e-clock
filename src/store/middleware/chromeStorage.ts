import { debounce } from '../../utils';

// import { SET_OPTIONS } from '../../actions/settings';
// import { SET_DOCK_OPTIONS } from '../../actions/dock';
// import { SET_INTRO } from '../../actions/intro';

import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import storage from '../../services/storage';
import { AppState } from '../createStore';
import { setOptions as setDockOptions } from '../slices/dockSlice';
import { setOptions as setSettingsOptions } from '../slices/settingsSlice';

const deboucedStorageSync = debounce((state: AppState) => storage.sync(state), 1000);

// const actions = [
//   // SET_INTRO, // after welcome screen
//   // SET_DOCK_OPTIONS, // when any dock options were changed
//   // SET_OPTIONS, // when any other options were changed
//   setDockOptions.type, // when any dock options were changed
//   setSettingsOptions.type, // when any other options were changed
// ];
//
// const chromeStorage =
//   ({ getState }) =>
//   (next) =>
//   (action) => {
//     const result = next(action);
//     if (!actions.includes(action.type)) return result;
//     deboucedStorageSync(getState());
//     return result;
//   };
//
// export default chromeStorage;

// new approach
export const syncSettingsToChromeStorageMiddleware = createListenerMiddleware<AppState>();

syncSettingsToChromeStorageMiddleware.startListening({
  predicate: isAnyOf(setDockOptions, setSettingsOptions),
  effect(_action, listenerApi) {
    const state = listenerApi.getState();
    deboucedStorageSync(state);
  },
});
