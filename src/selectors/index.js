import {createSelector} from 'reselect';
import {convertTemperature} from '../utils';

export const selectDock = state => state.dock;
export const selectSettings = state => state.settings;
export const selectView = state => state.view;
export const selectIntro = state => state.intro;
export const selectWeather = state => state.weather;


export const selectLocationName = createSelector(
  selectSettings,
  ({useLocation, customLocation}) => useLocation === 'custom' ? customLocation || 'auto' : 'auto'
);

export const selectWeatherData = createSelector(
  [selectWeather, selectLocationName],
  (weather, location) => weather[location] || null
);

export const selectCurrentWeather = createSelector(
  [selectWeatherData, selectSettings],
  (weather, {temperatureUnits}) => {
    if (!weather || !weather.data || !weather.data.current) return null;
    const {current} = weather.data;
    return {
      ...current,
      temp: convertTemperature(current.temp, temperatureUnits)
    };
  }
);

export const selectWeatherForecast = createSelector(
  [selectWeatherData, selectSettings],
  (weather, {temperatureUnits}) => {
    if (!weather || !weather.data || !weather.data.forecast) return null;
    const {forecast} = weather.data;
    return forecast.slice(0, 5).map(day => ({
      ...day,
      min: convertTemperature(day.min, temperatureUnits),
      max: convertTemperature(day.max, temperatureUnits)
    }));
  }
);

export const selectLocation = createSelector(
  selectWeatherData,
  weather => {
    if (!weather || !weather.data || !weather.data.location) return null;
    return weather.data.location;
  }
);

export const selectWeatherLoading = createSelector(
  selectWeatherData,
  weather => weather && weather.loading
);

export const selectWeatherError = createSelector(
  selectWeatherData,
  weather => weather && weather.error
);
