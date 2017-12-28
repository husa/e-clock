export function selectDock (state) {
  return state.dock;
}

export function selectSettings (state) {
  return state.settings;
}

export function selectView (state) {
  return state.view;
}

export function selectWeatherData (state) {
  const location = selectLocationName(state);
  return state.weather[location] || {};
}

export function selectForecast (state) {
  const weatherState = selectWeatherData(state);
  let forecast = [];
  if (!weatherState.data) return [];
  forecast = weatherState.data.list || [];
  const units = selectSettings(state).temperatureUnits;
  return forecast.map(day => Object.assign({}, {
    min: selectTemperature(day.temp.min, units),
    max: selectTemperature(day.temp.max, units),
    icon: day.weather[0].icon.match(/\d+/)[0],
    text: day.weather[0].main,
    description: day.weather[0].description
  }));
}

function selectTemperature (kelvin, units) {
  return Math.round(units === 'c' ? kelvin - 273.15 : kelvin * 9 / 5 - 459.67);
}

export function selectLocation (state) {
  const weatherState = selectWeatherData(state);
  if (weatherState.data && weatherState.data.city) {
    const {name, country} = weatherState.data.city;
    return {
      city: name,
      country
    };
  }
  return {};
}

export function selectWeatherError (state) {
  const weatherState = selectWeatherData(state);
  return weatherState.error;
}

export function selectWeatherLoading (state) {
  const weatherState = selectWeatherData(state);
  return weatherState.loading;
}

export function selectLocationName (state) {
  const {useLocation, customLocation} = selectSettings(state);
  if (useLocation === 'custom') {
    return customLocation || 'auto';
  }
  return 'auto';
}

export function selectIntro (state) {
  return state.intro;
}
