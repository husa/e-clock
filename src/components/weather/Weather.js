import './weather.styl';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import lang from '../../services/lang';

import ErrorMessage from '../error/ErrorMessage';

class Weather extends Component {
  componentDidMount () {
    if (this.props.settings.displayWeather) {
      this.loadWeather(this.props);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.settings.displayWeather && nextProps.settings.displayWeather) {
      this.loadWeather(nextProps);
    }
  }

  loadWeather (props) {
    const hasForecast = !!props.forecast.length;
    const hasLocation = !!Object.keys(props.location).length;
    const isLoading = props.loading;
    const errorHappened = props.error;
    if ((!hasForecast || !hasLocation) && !isLoading && !errorHappened) {
      this.props.loadWeather(props.locationName);
    }
  }

  getLocation () {
    const {location} = this.props;

    if (!location.city || !location.country) return null;

    return (
      <div className="weather__location">
        <span className="weather__location-city">
          {location.city}
        </span>
        <span className="weather__location-country">
          {location.country}
        </span>
      </div>
    );
  }

  getForecast () {
    const {forecast} = this.props;
    if (!forecast.length) return null;

    const {fontSize} = this.props.settings;
    const forecastStyle = {
      transform: `scale(${fontSize * 0.075 + 0.125})`
    };

    const days = forecast.map((day, i) => (
      <div key={i} className="weather__day">
        <div className="weather__day-icon">
          <svg
            viewBox="0 0 100 100"
            width="100"
            height="100">
            <use xlinkHref={`#weather-${day.icon}`}></use>
          </svg>
        </div>
        <div className="weather__day-temperature">
          <div className="weather__day-temperature--high">
            {day.max}°
          </div>
          <div className="weather__day-temperature--low">
            {day.min}°
          </div>
        </div>
      </div>
    ));

    return (
      <div className="weather__forecast" style={forecastStyle}>
        {days}
      </div>
    );
  }

  getError () {
    const {error} = this.props;
    let message = lang.t('WeatherGeneralError');

    if (error.type === 'PositionError') {
      const {code} = error.error;
      switch (code) {
        case 1:
          message = lang.t('WeatherPositionErrorPermissionDenied');
          break;
        case 2:
          message = lang.t('WeatherPositionErrorPossitionUnavailable');
          break;
        case 3:
          message = lang.t('WeatherPositionErrorTimeout');
          message = 'timeout';
          break;
        default:
          message = lang.t('WeatherPositionErrorUnknownError');
      }
    }

    return (
      <ErrorMessage className="weather__error">
        {message}
      </ErrorMessage>
    );
  }

  getWeather () {
    if (this.props.error) return this.getError();

    return (
      <div>
        {this.getLocation()}
        {this.getForecast()}
      </div>
    );
  }

  render () {
    if (!this.props.settings.displayWeather) return null;
    const {fontSize, fontFamily} = this.props.settings;
    const style = {
      fontSize: `${fontSize}em`,
      fontFamily
    };

    return (
      <div className="weather" style={style}>
        {this.getWeather()}
      </div>
    );
  }
}

Weather.propTypes = {
  forecast: PropTypes.array,
  location: PropTypes.object,
  locationName: PropTypes.string,
  settings: PropTypes.object,
  error: PropTypes.any,
  loadWeather: PropTypes.func
};

export default Weather;
