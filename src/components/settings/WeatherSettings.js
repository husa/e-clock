import './weatherSettings.styl';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobindr';

import lang from '../../services/lang';
import SettingsItem from './SettingsItem';

class WeatherSettings extends Component {
  constructor (...args) {
    super(...args);
    autobind(this);

    this.onUnitsChangeC = this.onUnitsChange.bind(this, 'c');
    this.onUnitsChangeF = this.onUnitsChange.bind(this, 'f');
    this.onLocationPreferenceChangeAuto = this.onLocationPreferenceChange.bind(this, 'auto');
    this.onLocationPreferenceChangeCustom = this.onLocationPreferenceChange.bind(this, 'custom');
  }

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

  onLocationPreferenceChange (useLocation) {
    this.props.setOptions({
      useLocation
    });
  }

  onCustomLocationBlur () {
    const value = this.customLocation.value;

    this.props.setOptions({
      customLocation: value
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
                onChange={this.onUnitsChangeC} />
              <span>{lang.t('TemperatureCelcius')}</span>
            </label>
          </div>
          <div className="settings-weather__units-option">
            <label>
              <input
                type="radio"
                value="f"
                checked={temperatureUnits === 'f'}
                onChange={this.onUnitsChangeF} />
              <span>{lang.t('TemperatureFahrenheit')}</span>
            </label>
          </div>
        </div>
      </div>
    );
  }

  getLocationPreferenceOption () {
    const {useLocation, customLocation} = this.props.settings;

    return (
      <div className="settings-weather__location">
        <span className="settings-weather__location-title">
          {lang.t('Location')}
        </span>
        <div className="settings-weather__location-options">
          <div className="settings-weather__location-option">
            <label>
              <input
                type="radio"
                checked={useLocation !== 'custom'}
                onChange={this.onLocationPreferenceChangeAuto} />
              <span>{lang.t('CurrentLocation')}</span>
            </label>
          </div>
          <div className="settings-weather__location-option">
            <label>
              <input
                type="radio"
                checked={useLocation === 'custom'}
                onChange={this.onLocationPreferenceChangeCustom} />
              <span>
                {lang.t('CustomLocation')}
                <div className="text-input">
                  <input
                    ref={c => {
                      this.customLocation = c;
                    }}
                    className="text-input__input"
                    type="text"
                    defaultValue={customLocation}
                    onBlur={this.onCustomLocationBlur}
                    required />
                  <span className="text-input__bar"></span>
                  <span className="text-input__label">{lang.t('WeatherYourCity')}</span>
                </div>
              </span>
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
          onClick={this.onDisplayWeatherClick} />

        {this.getUnitsOptions()}

        {this.getLocationPreferenceOption()}
      </div>
    );
  }
}

WeatherSettings.propTypes = {
  settings: PropTypes.object,
  setOptions: PropTypes.func
};

export default WeatherSettings;
