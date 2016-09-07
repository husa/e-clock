import {
  OPEN_SETTINGS,
  CLOSE_SETTINGS,
  TOGGLE_SETTINGS
} from '../actions/view';
import {getView} from '../selectors';
import analytics from '../common/analytics';

const actions = [
  OPEN_SETTINGS,
  CLOSE_SETTINGS,
  TOGGLE_SETTINGS
];

const analyticsMiddleware = store => next => action => {
  const result = next(action);
  if (actions.includes(action.type)) {
    let page;
    const {settingsOpen} = getView(store.getState());
    if (settingsOpen) page = 'settings';
    analytics.trackPage(page);
  }
  return result;
};

export default analyticsMiddleware;
