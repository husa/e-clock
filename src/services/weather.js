import location from './location';
import cache from './cache';
import analytics from './analytics';

const weatherDefaults = {
  mode: 'json',
  units: 'internal',
  cnt: '5',
  type: 'accurate'
};

const API_KEYS = WEATHER_API_KEY.split(',');

const CACHE_ID = 'weatherCache';
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

const getRandom = items => items[Math.floor(Math.random() * items.length)];
const cacheKey = location => `${CACHE_ID}@${location}`;

class Weather {
  getApiKey () {
    return getRandom(API_KEYS);
  }

  createUrlFromPosition (position) {
    const lat = position.coords.latitude.toFixed(5);
    const lon = position.coords.longitude.toFixed(5);
    const {mode, type, units, cnt} = weatherDefaults;
    const apikey = this.getApiKey();

    return `http://api.openweathermap.org/data/2.5/forecast/daily?&mode=${mode}&type=${type}&units=${units}&cnt=${cnt}&lat=${lat}&lon=${lon}&APPID=${apikey}`;
  }

  createUrlFromLocation (location) {
    const {mode, type, units, cnt} = weatherDefaults;
    const apikey = this.getApiKey();

    return Promise.resolve(
      `http://api.openweathermap.org/data/2.5/forecast/daily?&mode=${mode}&type=${type}&units=${units}&cnt=${cnt}&q=${location}&APPID=${apikey}`
    );
  }

  getWeatherUrl (locationConfig) {
    if (locationConfig !== 'auto') {
      return this.createUrlFromLocation(locationConfig);
    }
    return location.getPosition().then(this.createUrlFromPosition.bind(this));
  }

  loadWeatherData (url) {
    return fetch(url).then(
      response => response.json(),
      err => Promise.reject(err)
    );
  }

  getWeather (location) {
    return cache.getItem(cacheKey(location)).then(
      cachedWeather => {
        analytics.trackEvent('weather', 'gotCache');
        return cachedWeather;
      },
      () => {
        analytics.trackEvent('weather', 'fetch');
        return this.getWeatherUrl(location)
          .then(this.loadWeatherData)
          .then(data => {
            if (!data.city || !data.list) return Promise.reject(data);
            return cache.setItem(cacheKey(location), data, {ttl: CACHE_TTL}).then(() => {
              analytics.trackEvent('weather', 'setCache');
              return data;
            });
          }).catch(err => {
            analytics.trackEvent('weather', 'error');
            return Promise.reject(err);
          });
      });
  }
}

const weather = new Weather();

export default weather;
