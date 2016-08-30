import {connect} from 'react-redux';

import {
  getForecast,
  getLocation,
  getSettings,
  getWeatherError,
  isWeatherLoading,
  getLocationName
} from '../../selectors';

import {loadWeather} from '../../actions/weather';

import Weather from '../../components/weather/Weather';

const mapStateToProps = state => ({
  forecast: getForecast(state),
  location: getLocation(state),
  locationName: getLocationName(state),
  loading: isWeatherLoading(state),
  error: getWeatherError(state),
  settings: getSettings(state)
});

const mapDispatchToProps = dispatch => ({
  loadWeather (location) {
    return dispatch(loadWeather(location));
  }
});

const WeatherContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Weather);

export default WeatherContainer;
