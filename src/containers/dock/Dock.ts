import { connect } from 'react-redux';

import { selectDock, selectSettings } from '../../selectors';

import Dock from '../../components/dock/Dock';

const mapStateToProps = state => ({
  dock: selectDock(state),
  autoHide: selectSettings(state).autoHideDock,
});

const DockContainer = connect(mapStateToProps)(Dock);

export default DockContainer;
