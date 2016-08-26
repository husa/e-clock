import './weather.styl';

import React, {Component, PropTypes} from 'react';

class Weather extends Component {

  componentDidMount () {
    if (!Object.keys(this.props.forecast).length || !this.props.location.length) {
      this.props.loadWeather();
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
    return forecast.map((day, i) => (
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
  }

  render () {
    if (!this.props.settings.displayWeather) return null;
    const {fontSize, fontFamily} = this.props.settings;
    const style = {
      fontSize: `${fontSize}em`,
      fontFamily
    };
    const forecastStyle = {
      transform: `scale(${fontSize * 0.075 + 0.125})`
    };

    return (
      <div className="weather" style={style}>
        {this.getLocation()}
        <div className="weather__forecast" style={forecastStyle}>
          {this.getForecast()}
        </div>
      </div>
    );
  }
}

Weather.propTypes = {
  forecast: PropTypes.array,
  location: PropTypes.object,
  settings: PropTypes.object,
  loadWeather: PropTypes.func
};

export default Weather;
