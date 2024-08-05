import { settings } from '../config';
import { DockState } from '../store/slices/dockSlice';
import { SettingsState } from '../store/slices/settingsSlice';

const items = Object.keys(settings);

export default function pluckSettings(data: SettingsState & DockState): Partial<SettingsState> {
  return Object.keys(data)
    .filter((k) => items.indexOf(k) !== -1)
    .reduce((prev, k) => {
      prev[k] = data[k];
      return prev;
    }, {});
}
