import { selectWeatherData, selectSettings, selectLocationName } from '../../selectors';

import { loadWeather } from '../../actions/weather';

const weatherBackgroundService = ({ getState, dispatch }) => next => action => {
  const result = next(action);
  const state = getState();
  // TODO: check for particular action types
  // if displayWeather is true and there's no weather data for current location
  // fetch weather for current location
  const weather = selectWeatherData(state);

  const { displayWeather } = selectSettings(state);
  if (!displayWeather) return result;
  if (weather || (weather && weather.loading) || (weather && weather.error)) return result;

  // if (displayWeather && (!weather || !weather.data) && !weather.loading && !weather.error) {
  const locationName = selectLocationName(state);
  // schedule load weather action dispatching on next loop
  Promise.resolve().then(() => dispatch(loadWeather(locationName)));
  // }
  return result;
};

export default weatherBackgroundService;
