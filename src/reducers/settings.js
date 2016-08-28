import {settings as defaults} from '../config';
import {SET_OPTIONS} from '../actions/settings';

function settings (state = defaults, action) {
  switch (action.type) {

    case SET_OPTIONS:
      return Object.assign({}, state, action.options);

    default:
      return Object.assign({}, state);
  }
}

export default settings;
