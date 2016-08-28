import {connect} from 'react-redux';

import {getSettings} from '../../selectors';

import App from '../../components/app/App';


const mapStateToProps = state => ({
  settings: getSettings(state)
});

const AppContainer = connect(
  mapStateToProps
)(App);

export default AppContainer;
