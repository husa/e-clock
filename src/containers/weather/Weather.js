import {connect} from 'react-redux';

import {
  selectForecast,
  selectLocation,
  selectSettings,
  selectWeatherError,
  selectWeatherLoading,
  selectLocationName
} from '../../selectors';

import {loadWeather} from '../../actions/weather';

import Weather from '../../components/weather/Weather';

const mapStateToProps = state => ({
  forecast: selectForecast(state),
  location: selectLocation(state),
  locationName: selectLocationName(state),
  loading: selectWeatherLoading(state),
  error: selectWeatherError(state),
  settings: selectSettings(state)
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
