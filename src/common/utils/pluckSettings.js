import {settings} from '../../config';

const items = Object.keys(settings);

export default function pluckSettings (data) {
  return Object.keys(data)
    .filter(k => items.indexOf(k) !== -1)
    .reduce((prev, k) => {
      prev[k] = data[k];
      return prev;
    }, {});
}
