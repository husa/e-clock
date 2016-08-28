import {
  OPEN_SETTINGS,
  CLOSE_SETTINGS,
  TOGGLE_SETTINGS
} from '../actions/view';

const initialState = {
  settingsOpen: false
};

function view (state = initialState, action) {
  switch (action.type) {

    case OPEN_SETTINGS:
      return Object.assign({}, state, {
        settingsOpen: true
      });

    case CLOSE_SETTINGS:
      return Object.assign({}, state, {
        settingsOpen: false
      });

    case TOGGLE_SETTINGS:
      return Object.assign({}, state, {
        settingsOpen: !state.settingsOpen
      });

    default:
      return Object.assign(state);
  }
}

export default view;
