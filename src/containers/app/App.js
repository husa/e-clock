import {connect} from 'react-redux';

import {selectSettings, selectIntro} from '../../selectors';

import App from '../../components/app/App';


const mapStateToProps = state => ({
  settings: selectSettings(state),
  intro: selectIntro(state)
});

const AppContainer = connect(
  mapStateToProps
)(App);

export default AppContainer;
