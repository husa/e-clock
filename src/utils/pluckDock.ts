import {dock} from '../config';

const items = dock
  .map(d => d.url)
  .filter(d => d !== 'settings');

export default function pluckDock (data) {
  return Object.keys(data)
    .filter(k => items.indexOf(k) !== -1)
    .reduce((prev, k) => {
      prev[k] = data[k];
      return prev;
    }, {});
}
