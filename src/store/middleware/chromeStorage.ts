import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { debounce } from '../../utils';
import storage from '../../services/storage';
import { AppState } from '../createStore';
import { setOptions as setDockOptions } from '../slices/dockSlice';
import { setOptions as setSettingsOptions } from '../slices/settingsSlice';

const deboucedStorageSync = debounce((state: AppState) => storage.sync(state), 1000);

// create instance of listener middleware
export const syncSettingsToChromeStorageMiddleware = createListenerMiddleware<AppState>();

// "start" listening for actions
syncSettingsToChromeStorageMiddleware.startListening({
  predicate: isAnyOf(setDockOptions, setSettingsOptions),
  effect(_action, listenerApi) {
    const state = listenerApi.getState();
    deboucedStorageSync(state);
  },
});
