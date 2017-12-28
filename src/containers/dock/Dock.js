import {connect} from 'react-redux';

import {
  selectDock,
  selectSettings
} from '../../selectors';

import {toggleSettings} from '../../actions/view';

import Dock from '../../components/dock/Dock';

const mapStateToProps = state => ({
  dock: selectDock(state),
  autoHide: selectSettings(state).autoHideDock
});

const mapDispatchToProps = dispatch => ({
  toggleSettings () {
    return dispatch(toggleSettings());
  }
});

const DockContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dock);

export default DockContainer;
