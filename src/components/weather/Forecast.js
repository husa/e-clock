// @flow

import './forecast.styl';

import * as React from 'react';

import type {WeatherResponseForecast} from '../../types';
import lang from '../../services/lang';
import Icon from './Icon';

const isToday = date => (new Date(date)).getDate() === (new Date).getDate();
const isTomorrow = date => (new Date(date)).getDay() === ((new Date).getDay() + 1) % 7;

const getDay = date => {
  if (isToday(date)) return lang.t('Today');
  if (isTomorrow(date)) return lang.t('Tomorrow');
  return lang.t(`Day${(new Date(date)).getDay()}`);
};

type Props = {
  data: WeatherResponseForecast
};

const WeatherForecast = (props: Props) => (
  <div className="weather-forecast">
    {props.data.map(day => (
      <div className="weather-forecast__day" key={day.date}>
        <div className="weather-forecast__day__name">
          {getDay(day.date)}
        </div>
        <Icon
          className="weather-forecast__day__icon"
          code={day.code}
          title={day.text} />
        <div className="weather-forecast__day__temperature">
          <span className="weather-forecast__day__temperature--max">
            {day.max}&deg;
          </span>
          <span className="weather-forecast__day__temperature__separator">/</span>
          <span className="weather-forecast__day__temperature--min">
            {day.min}&deg;
          </span>
        </div>
      </div>
    ))}
  </div>
);

export default WeatherForecast;
