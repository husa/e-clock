import { configureStore } from '@reduxjs/toolkit';
import settingsReducer, { SettingsState } from './slices/settingsSlice';
import dockReducer, { DockState } from './slices/dockSlice';
import { syncSettingsToChromeStorageMiddleware } from './middleware/chromeStorage';

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
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(syncSettingsToChromeStorageMiddleware.middleware),
  });

export default createAppStore;
