import { debounce } from '../../utils';

import { SET_OPTIONS } from '../../actions/settings';
import { SET_DOCK_OPTIONS } from '../../actions/dock';
import { SET_INTRO } from '../../actions/intro';

import storage from '../../services/storage';

const sync = debounce((state) => storage.sync(state), 1000);

const actions = [
  SET_INTRO, // after welcome screen
  SET_DOCK_OPTIONS, // when any dock options were changed
  SET_OPTIONS, // when any other options were changed
];

const chromeStorage =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action);
    if (!actions.includes(action.type)) return result;
    sync(getState());
    return result;
  };

export default chromeStorage;
