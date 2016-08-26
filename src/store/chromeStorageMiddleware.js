import {debounce} from '../common/utils';
import {SET_OPTIONS} from './actions/settings';
import {SET_DOCK_OPTIONS} from './actions/dock';

import storage from '../common/storage';

const sync = debounce(state => storage.sync(state), 1000);

const chromeStorage = store => next => action => {
  const result = next(action);
  if (action.type !== SET_OPTIONS && action.type !== SET_DOCK_OPTIONS) return result;
  sync(store.getState());
  return result;
};

export default chromeStorage;
