import { AppState } from '../../../store/createStore';
import { DockState } from '../../../store/slices/dockSlice';
import { SettingsState } from '../../../store/slices/settingsSlice';

class ChromeSyncStorage {
  key: string;
  constructor(key: string) {
    this.key = key;
  }

  async load() {
    let data: unknown;
    try {
      data = await chrome.storage.sync.get(this.key);
    } catch (e) {
      return null;
    }
    if (!data || !Object.keys(data).length || !data[this.key]) {
      return null;
    }
    return data[this.key] as SettingsState & DockState;
  }

  async sync(data: AppState) {
    if (!data) return;
    const { settings, dock } = data;
    if (!settings && !dock) return;
    try {
      await chrome.storage.sync.set({
        [this.key]: { ...settings, ...dock },
      });
    } catch (e) {
      return Promise.resolve();
    }
  }
}

export default ChromeSyncStorage;
