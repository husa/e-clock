// @flow

import type {WeatherProvider} from './interface';

const BASE_URL = 'https://query.yahooapis.com/v1/public/yql';

const createUrl = woeidSelect => `${BASE_URL}?q=select units, location, item.condition, item.forecast from weather.forecast where woeid in (${woeidSelect}) and u="c"&format=json&crossProduct=optimized`;

const woeidSelectByLocation = (location: string) => `select woeid from geo.places(1) where text="${location}"`;
const woeidSelectByPosition = (position: Position) => `select woeid from geo.places(1) where text="(${position.coords.latitude}, ${position.coords.longitude})"`;

class Yahoo implements WeatherProvider {
  createUrlFromLocation (location: string): string {
    return createUrl(woeidSelectByLocation(location));
  }

  createUrlFromPosition (position: Position): string {
    return createUrl(woeidSelectByPosition(position));
  }

  fetch (url: string): Promise<*> {
    return fetch(url).then(res => res.json()).then(res => {
      try {
        const city = res.query.results.channel.location.city;
        const current = res.query.results.channel.item.condition;
        current.temp = +current.temp;
        const forecast = res.query.results.channel.item.forecast.map(({code, date, day, high, low, text}) => ({
          code, date, day, text,
          min: +low,
          max: +high
        }));
        return {
          location: {city},
          current,
          forecast
        };
      } catch (err) {
        return Promise.reject('Response error');
      }
    });
  }
}

export default Yahoo;
