import { AppState } from '../../../store/createStore';
import { DockState } from '../../../store/slices/dockSlice';
import { SettingsState } from '../../../store/slices/settingsSlice';

class ChromeSyncStorage {
  key: string;
  constructor(key: string) {
    this.key = key;
  }

  load(): Promise<(SettingsState & DockState) | null> {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(this.key, (data) => {
        if (!data || !Object.keys(data).length || !data[this.key]) {
          reject();
        } else {
          data = data[this.key];
          resolve(data);
        }
      });
    }).then(
      (data) => data,
      () => null,
    );
  }

  sync(data: AppState) {
    if (!data) return;
    const { settings, dock } = data;
    if (!settings && !dock) return;

    return chrome.storage.sync.set({
      [this.key]: { ...settings, ...dock },
    });
  }
}

export default ChromeSyncStorage;
