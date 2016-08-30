export function getDock (state) {
  return state.dock;
}

export function getSettings (state) {
  return state.settings;
}

export function getView (state) {
  return state.view;
}

function getWeatherData (state) {
  const location = getLocationName(state);
  return state.weather[location] || {};
}

export function getForecast (state) {
  const weatherState = getWeatherData(state);
  let forecast = [];
  if (!weatherState.data) return [];
  forecast = weatherState.data.list || [];
  const units = getSettings(state).temperatureUnits;
  return forecast.map(day => Object.assign({}, {
    min: getTemperature(day.temp.min, units),
    max: getTemperature(day.temp.max, units),
    icon: day.weather[0].icon.match(/\d+/)[0],
    text: day.weather[0].main,
    description: day.weather[0].description
  }));
}

function getTemperature (kelvin, units) {
  return Math.round(units === 'c' ? kelvin - 273.15 : kelvin * 9 / 5 - 459.67);
}

export function getLocation (state) {
  const weatherState = getWeatherData(state);
  if (weatherState.data && weatherState.data.city) {
    const {name, country} = weatherState.data.city;
    return {
      city: name,
      country
    };
  }
  return {};
}

export function getWeatherError (state) {
  const weatherState = getWeatherData(state);
  return weatherState.error;
}

export function isWeatherLoading (state) {
  const weatherState = getWeatherData(state);
  return weatherState.loading;
}

export function getLocationName (state) {
  const {useLocation, customLocation} = getSettings(state);
  if (useLocation === 'custom') {
    return customLocation || 'auto';
  }
  return 'auto';
}

export function getIntro (state) {
  return state.intro;
}
