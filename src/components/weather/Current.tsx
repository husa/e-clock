import './current.scss';

import Icon from './Icon';
import type { WeatherResponseCurrent, WeatherResponseLocation } from '../../types';

type Props = {
  data: WeatherResponseCurrent;
  location: WeatherResponseLocation;
  temperatureUnits: 'c' | 'f';
};

const CurrentWeather = ({ data, location, temperatureUnits }: Props) => (
  <div className="weather-current">
    <div className="weather-current__city">{location.city}</div>
    <Icon className="weather-current__icon" code={data.code} title={data.text} />
    <div className="weather-current__temperature">{data.temp}</div>
    <div className="weather-current__degrees">°{temperatureUnits.toUpperCase()}</div>
  </div>
);

export default CurrentWeather;
