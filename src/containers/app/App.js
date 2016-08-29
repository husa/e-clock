import {connect} from 'react-redux';

import {getSettings, getIntro} from '../../selectors';

import App from '../../components/app/App';


const mapStateToProps = state => ({
  settings: getSettings(state),
  intro: getIntro(state)
});

const AppContainer = connect(
  mapStateToProps
)(App);

export default AppContainer;
