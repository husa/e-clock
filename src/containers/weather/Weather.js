import {connect} from 'react-redux';

import {
  getForecast,
  getLocation,
  getSettings
} from '../../store/selectors';

import {loadWeather} from '../../store/actions/weather';

import Weather from '../../components/weather/Weather';

const mapStateToProps = state => ({
  forecast: getForecast(state),
  location: getLocation(state),
  settings: getSettings(state)
});

const mapDispatchToProps = dispatch => ({
  loadWeather () {
    return dispatch(loadWeather());
  }
});

const WeatherContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Weather);

export default WeatherContainer;
