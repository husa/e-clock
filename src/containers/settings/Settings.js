import {connect} from 'react-redux';

import {
  getSettings,
  getView,
  getDock
} from '../../selectors';

import {closeSettings} from '../../actions/view';
import {setOptions} from '../../actions/settings';
import {setDockOptions} from '../../actions/dock';

import Settings from '../../components/settings/Settings';

const mapStateToProps = state => {
  const settings = getSettings(state);
  const dock = getDock(state);
  const view = getView(state);

  return {
    isOpen: view.settingsOpen,
    settings,
    dock
  };
};

const mapDispatchToProps = dispatch => ({
  closeSettings () {
    return dispatch(closeSettings());
  },

  setOptions (options) {
    return dispatch(setOptions(options));
  },

  setDockOptions (options) {
    return dispatch(setDockOptions(options));
  }
});

const SettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);

export default SettingsContainer;
