import {connect} from 'react-redux';

import {
  selectSettings,
  selectView,
  selectDock
} from '../../selectors';

import {closeSettings} from '../../actions/view';
import {setOptions} from '../../actions/settings';
import {setDockOptions} from '../../actions/dock';

import Settings from '../../components/settings/Settings';

const mapStateToProps = state => {
  const settings = selectSettings(state);
  const dock = selectDock(state);
  const view = selectView(state);

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
