import {SET_DOCK_OPTIONS} from '../actions/dock';

function settings (state = {}, action) {
  switch (action.type) {

    case SET_DOCK_OPTIONS:
      return Object.assign({}, state, action.options);

    default:
      return Object.assign({}, state);
  }
}

export default settings;
