import {connect} from 'react-redux';

import {
  getDock,
  getSettings
} from '../../selectors';

import {toggleSettings} from '../../actions/view';

import Dock from '../../components/dock/Dock';

const mapStateToProps = state => ({
  dock: getDock(state),
  autoHide: getSettings(state).autoHideDock
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

