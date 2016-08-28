import './weatherSettings.styl';

import React, {Component, PropTypes} from 'react';

import lang from '../../common/lang';
import SettingsItem from './SettingsItem';

class WeatherSettings extends Component {

  onDisplayWeatherClick () {
    this.props.setOptions({
      displayWeather: !this.props.settings.displayWeather
    });
  }

  onUnitsChange (unit) {
    this.props.setOptions({
      'temperatureUnits': unit
    });
  }

  getUnitsOptions () {
    const {temperatureUnits} = this.props.settings;

    return (
      <div className="settings-weather__units">
        <span className="settings-weather__units-title">
          {lang.t('TemperatureUnits')}
        </span>
        <div className="settings-weather__units-options">
          <div className="settings-weather__units-option">
            <label>
              <input
                type="radio"
                value="c"
                checked={temperatureUnits === 'c'}
                onChange={this.onUnitsChange.bind(this, 'c')} />
              <span>{lang.t('TemperatureCelcius')}</span>
            </label>
          </div>
          <div className="settings-weather__units-option">
            <label>
              <input
                type="radio"
                value="f"
                checked={temperatureUnits === 'f'}
                onChange={this.onUnitsChange.bind(this, 'f')} />
              <span>{lang.t('TemperatureFahrenheit')}</span>
            </label>
          </div>
        </div>
      </div>
    );
  }

  render () {
    return (
      <div className="settings-weather">

        <SettingsItem
          className="settings-weather__time-format"
          title={lang.t('ShowWeather')}
          checked={this.props.settings.displayWeather}
          onClick={this.onDisplayWeatherClick.bind(this)} />

        {this.getUnitsOptions()}
      </div>
    );
  }
}

WeatherSettings.propTypes = {
  settings: PropTypes.object,
  setOptions: PropTypes.func
};

export default WeatherSettings;
