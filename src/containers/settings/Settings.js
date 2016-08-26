import {connect} from 'react-redux';

import {
  getSettings,
  getView,
  getDock
} from '../../store/selectors';

import {closeSettings} from '../../store/actions/view';
import {setOptions} from '../../store/actions/settings';
import {setDockOptions} from '../../store/actions/dock';

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
