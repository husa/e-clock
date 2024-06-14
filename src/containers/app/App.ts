import {connect} from 'react-redux';

import {
  selectSettings,
  selectIntro,
  selectWeatherData
} from '../../selectors';

import App from '../../components/app/App';


const mapStateToProps = state => ({
  settings: selectSettings(state),
  intro: selectIntro(state),
  weather: selectWeatherData(state)
});

const AppContainer = connect(
  mapStateToProps
)(App);

export default AppContainer;
