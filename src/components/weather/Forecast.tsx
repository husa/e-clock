import './forecast.scss';

import type { WeatherResponseForecast } from '../../types';
import lang from '../../services/lang';
import Icon from './Icon';

const ONE_DAY = 24 * 60 * 60 * 1000;

export const daysBetween = (day1: string, day2: string) => {
  const d1 = new Date(day1);
  const d2 = new Date(day2);
  return ((d2.getTime() - d1.getTime()) / ONE_DAY) | 0;
};

export const getDay = (date: string) => {
  if (daysBetween(new Date().toDateString(), date) === 0) return lang.t('i18nToday');
  if (daysBetween(new Date().toDateString(), date) === 1) return lang.t('i18nTomorrow');
  return lang.t(`i18nDay${new Date(date).getDay()}` as 'i18nDay0');
};

type Props = {
  data: WeatherResponseForecast;
};

const WeatherForecast = (props: Props) => (
  <div className="weather-forecast">
    {props.data.map((day) => (
      <div className="weather-forecast__day" key={day.date}>
        <div className="weather-forecast__day__name">{getDay(day.date)}</div>
        <Icon className="weather-forecast__day__icon" code={day.code} title={day.text} />
        <div className="weather-forecast__day__temperature">
          <span className="weather-forecast__day__temperature--max">{day.max}&deg;</span>
          <span className="weather-forecast__day__temperature__separator">/</span>
          <span className="weather-forecast__day__temperature--min">{day.min}&deg;</span>
        </div>
      </div>
    ))}
  </div>
);

export default WeatherForecast;
