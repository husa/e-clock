import {connect} from 'react-redux';

import {
  getDock,
  getSettings
} from '../../store/selectors';
import {toggleSettings} from '../../store/actions/view';

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

