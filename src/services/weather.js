import cache from './cache';
import analytics from './analytics';

const weatherDefaults = {
  mode: 'json',
  units: 'internal',
  cnt: '5',
  type: 'accurate'
};

const API_KEYS = WEATHER_API_KEY.split(',');

const locationConfig = {
  enableHighAccuracy: true,
  timeout: 5000, // 5s
  maximumAge: 1000 * 60 * 60 // 1 hour
};

const TIMEOUT_INCREASE = 1000;
const CACHE_ID = 'weatherCache';
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

const getRandom = items => items[Math.floor(Math.random() * items.length)];

const isCacheValid = data => {
  if (!data) return false;
  const {ts} = data;
  if (!ts) return false;
  const cached = new Date(ts);
  const now = new Date();
  if (now - cached > CACHE_TTL) return false;
  return true;
};

class Weather {
  getCurrentPosition () {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, locationConfig);
    });
  }

  getLocation () {
    return this.getCurrentPosition().then(
      position => position,
      positionError => {
        if (positionError.code === 3) {
          locationConfig.timeout += TIMEOUT_INCREASE;
          return this.getLocation();
        }
        return Promise.reject({
          type: 'PositionError',
          message: 'Can not retrieve location',
          error: positionError
        });
      }
    );
  }

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

  getWeatherUrl (location) {
    if (location !== 'auto') {
      return this.createUrlFromLocation(location);
    }
    return this.getLocation().then(this.createUrlFromPosition.bind(this));
  }

  loadWeatherData (url) {
    analytics.trackEvent('weather', 'fetch');
    return fetch(url).then(
      response => response.json(),
      err => Promise.reject(err)
    );
  }

  getWeather (location) {
    return cache.getItem(CACHE_ID).then(cachedWeather => {
      if (isCacheValid(cachedWeather)) {
        analytics.trackEvent('weather', 'gotCache');
        return cachedWeather;
      }
      return this.getWeatherUrl(location)
        .then(this.loadWeatherData)
        .then(data => {
          if (!data.city || !data.list) return Promise.reject(data);
          return cache.setItem(CACHE_ID, data).then(() => {
            analytics.trackEvent('weather', 'setCache');
            return data;
          });
        });
    });
  }
}

const weather = new Weather();

export default weather;
