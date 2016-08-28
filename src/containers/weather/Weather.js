import {connect} from 'react-redux';

import {
  getForecast,
  getLocation,
  getSettings,
  getWeatherError
} from '../../selectors';

import {loadWeather} from '../../actions/weather';

import Weather from '../../components/weather/Weather';

const mapStateToProps = state => ({
  forecast: getForecast(state),
  location: getLocation(state),
  error: getWeatherError(state),
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
