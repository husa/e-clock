export function getDock (state) {
  return state.dock;
}

export function getSettings (state) {
  return state.settings;
}

export function getView (state) {
  return state.view;
}

export function getForecast (state) {
  let forecast = [];
  if (!state.weather || !state.weather.data) return [];
  forecast = state.weather.data.list || [];
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
  if (state.weather && state.weather.data && state.weather.data.city) {
    const {name, country} = state.weather.data.city;
    return {
      city: name,
      country
    };
  }
  return {};
}

export function getWeatherError (state) {
  return state.weather.error;
}
