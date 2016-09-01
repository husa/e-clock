const weatherConfig = {
  mode: 'json',
  units: 'internal',
  cnt: '5',
  type: 'accurate',
  apikey: 'e35c4324fb7999ba5788fbba8c901d11'
};

const locationConfig = {
  enableHighAccuracy: true,
  timeout: 5000, // 5s
  maximumAge: 1000 * 60 * 60 // 1 hour
};

const TIMEOUT_INCREASE = 1000;


class Weather {

  getCurrentPosition () {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        locationConfig
      );
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

  createUrlFromPosition (position) {
    const lat = position.coords.latitude.toFixed(5);
    const lon = position.coords.longitude.toFixed(5);
    const {mode, type, units, cnt, apikey} = weatherConfig;

    return `http://api.openweathermap.org/data/2.5/forecast/daily?&mode=${mode}&type=${type}&units=${units}&cnt=${cnt}&lat=${lat}&lon=${lon}&APPID=${apikey}`;
  }

  createUrlFromLocation (location) {
    const {mode, type, units, cnt, apikey} = weatherConfig;

    return Promise.resolve(`http://api.openweathermap.org/data/2.5/forecast/daily?&mode=${mode}&type=${type}&units=${units}&cnt=${cnt}&q=${location}&APPID=${apikey}`);
  }

  getWeatherUrl (location) {
    if (location !== 'auto') {
      return this.createUrlFromLocation(location);
    }
    return this.getLocation()
      .then(this.createUrlFromPosition);
  }

  loadWeatherData (url) {
    return fetch(url).then(
      response => response.json(),
      err => Promise.reject(err)
    );
  }

  getWeather (location) {
    return this.getWeatherUrl(location)
      .then(this.loadWeatherData)
      .then(data => {
        if (!data.city || !data.list) return Promise.reject(data);
        return data;
      });
  }
}

const weather = new Weather;

export default weather;