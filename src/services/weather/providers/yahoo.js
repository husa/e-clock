// @flow

import type { WeatherProvider } from './interface';
import CryptoJS from 'crypto-js';

const BASE_URL = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';
const APP_ID = __YAHOO_APP_ID__;
const CONSUMER_KEY = __YAHOO_CONSUMER_KEY__;
const CONSUMER_SECRET = __YAHOO_CONSUMER_SECRET__;

type WeatherQueryLocation = {|
  location: string,
|};

type WeatherQueryPosition = {|
  lat: string,
  lon: string,
|};

const serializeQuery = query => new URLSearchParams(query).toString();

const getSignedAuthHeader = query => {
  var method = 'GET';
  var oauth = {
    oauth_consumer_key: CONSUMER_KEY,
    oauth_nonce: Math.random()
      .toString(36)
      .substring(2),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: parseInt(new Date().getTime() / 1000).toString(),
    oauth_version: '1.0',
  };

  var merged = { ...query, ...oauth };
  // Note the sorting here is required
  var merged_arr = Object.keys(merged)
    .sort()
    .map(function(k) {
      return [k + '=' + encodeURIComponent(merged[k])];
    });
  var signature_base_str =
    method + '&' + encodeURIComponent(BASE_URL) + '&' + encodeURIComponent(merged_arr.join('&'));

  var composite_key = encodeURIComponent(CONSUMER_SECRET) + '&';
  var hash = CryptoJS.HmacSHA1(signature_base_str, composite_key);
  var signature = hash.toString(CryptoJS.enc.Base64);

  oauth['oauth_signature'] = signature;

  var auth_header =
    'OAuth ' +
    Object.keys(oauth)
      .map(function(k) {
        return [k + '="' + oauth[k] + '"'];
      })
      .join(',');

  return auth_header;
};

class Yahoo implements WeatherProvider<WeatherQueryLocation | WeatherQueryPosition> {
  createUrlFromLocation(location: string): WeatherQueryLocation {
    return {
      location,
    };
  }

  createUrlFromPosition(position: Position): WeatherQueryPosition {
    return {
      lat: `${position.coords.latitude}`,
      lon: `${position.coords.longitude}`,
    };
  }

  fetch(url: WeatherQueryLocation | WeatherQueryPosition): Promise<*> {
    const query = {
      ...url,
      format: 'json',
      u: 'c',
    };

    return fetch(`${BASE_URL}?${serializeQuery(query)}`, {
      headers: {
        Authorization: getSignedAuthHeader(query),
        'X-Yahoo-App-Id': APP_ID,
      },
    })
      .then(res => res.json())
      .then(res => {
        try {
          const city = res.location.city;
          const current = res.current_observation.condition; // res.query.results.channel.item.condition;
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
