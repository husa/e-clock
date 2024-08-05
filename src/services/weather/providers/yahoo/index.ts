import { WeatherProvider } from '../interface';
import { getSignedAuthHeader } from './signature';

const BASE_URL = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';
const APP_ID = __YAHOO_APP_ID__;
const CONSUMER_KEY = __YAHOO_CONSUMER_KEY__;
const CONSUMER_SECRET = __YAHOO_CONSUMER_SECRET__;

type WeatherQueryLocation = {
  location: string;
};

type WeatherQueryPosition = {
  lat: string;
  lon: string;
};

const serializeQuery = query => new URLSearchParams(query).toString();

class Yahoo implements WeatherProvider<WeatherQueryLocation | WeatherQueryPosition> {
  createUrlFromLocation(location: string): WeatherQueryLocation {
    return {
      location,
    };
  }

  createUrlFromPosition(position: GeolocationPosition): WeatherQueryPosition {
    return {
      lat: `${position.coords.latitude}`,
      lon: `${position.coords.longitude}`,
    };
  }

  fetch(url: WeatherQueryLocation | WeatherQueryPosition): Promise<any> {
    const query = {
      ...url,
      format: 'json',
      u: 'c',
    };

    return fetch(`${BASE_URL}?${serializeQuery(query)}`, {
      headers: {
        Authorization: getSignedAuthHeader(query, {
          BASE_URL,
          CONSUMER_KEY,
          CONSUMER_SECRET,
        }),
        'X-Yahoo-App-Id': APP_ID,
      },
    })
      .then(res => res.json())
      .then(res => {
        try {
          const city = res.location.city;
          const current = res.current_observation.condition;
          current.temp = +current.temperature;
          const forecast = res.forecasts.map(({ code, date, day, high, low, text }) => ({
            code,
            date: date * 1000,
            day,
            text,
            min: +low,
            max: +high,
          }));
          return {
            location: { city },
            current,
            forecast,
          };
        } catch (err) {
          return Promise.reject('Response error');
        }
      });
  }
}

export default Yahoo;
