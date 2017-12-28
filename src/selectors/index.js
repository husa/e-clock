import {createSelector} from 'reselect';
import {convertTemperature} from '../common/utils';

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
  (weather, location) => weather[location] || {}
);

export const selectForecast = createSelector(
  [selectWeatherData, selectSettings],
  (weather, {temperatureUnits}) => {
    if (!weather.data) return [];
    return (weather.data.list || []).map(day => ({
      min: convertTemperature(day.temp.min, temperatureUnits),
      max: convertTemperature(day.temp.max, temperatureUnits),
      icon: day.weather[0].icon.match(/\d+/)[0],
      text: day.weather[0].main,
      description: day.weather[0].description
    }));

  }
);

export const selectLocation = createSelector(
  selectWeatherData,
  weather => {
    if (weather.data && weather.data.city) {
      const {name, country} = weather.data.city;
      return {
        city: name,
        country
      };
    }
    return {};
  }
);

export const selectWeatherLoading = createSelector(
  selectWeatherData,
  weather => weather.loading
);

export const selectWeatherError = createSelector(
  selectWeatherData,
  weather => weather.error
);
