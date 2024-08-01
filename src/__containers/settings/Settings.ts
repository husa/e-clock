import { connect } from 'react-redux';

import { selectSettings, selectDock } from '../../selectors';

import { setOptions } from '../../__actions/settings';
import { setDockOptions } from '../../__actions/dock';

import Settings from '../../components/settings_old/Settings';

const mapStateToProps = (state) => {
  const settings = selectSettings(state);
  const dock = selectDock(state);

  return {
    settings,
    dock,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setOptions(options) {
    return dispatch(setOptions(options));
  },

  setDockOptions(options) {
    return dispatch(setDockOptions(options));
  },
});

const SettingsContainer = connect(mapStateToProps, mapDispatchToProps)(Settings);

export default SettingsContainer;
