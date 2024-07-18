import { dock } from '../config';
import { DockURL } from '../config/dock';
import { DockState } from '../store/slices/dockSlice';
import { SettingsState } from '../store/slices/settingsSlice';

const items = dock.map((d) => d.url).filter((url) => url !== 'settings');

export default function pluckDock(data: SettingsState & DockState): DockState {
  return Object.keys(data)
    .filter((k) => items.indexOf(k as DockURL) !== -1) // hack to fix TS, `k` here is actually DockURL | string
    .reduce((prev, k) => {
      prev[k] = data[k];
      return prev;
    }, {});
}
