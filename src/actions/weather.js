import weather from '../services/weather';

export const WEATHER_LOAD_REQUEST = 'WEATHER_LOAD_REQUEST';
export const WEATHER_LOAD_SUCCESS = 'WEATHER_LOAD_SUCCESS';
export const WEATHER_LOAD_FAILURE = 'WEATHER_LOAD_FAILURE';


export const loadWeatherRequest = location => ({
  type: WEATHER_LOAD_REQUEST,
  location
});

export const loadWeatherSuccess = (data, location) => ({
  type: WEATHER_LOAD_SUCCESS,
  data,
  location
});

export const loadWeatherFailure = (error, location) => ({
  type: WEATHER_LOAD_FAILURE,
  error,
  location
});

export const loadWeather = location => dispatch => {
  dispatch(loadWeatherRequest(location));

  return weather.getWeather(location).then(
    data => dispatch(loadWeatherSuccess(data, location)),
    err => dispatch(loadWeatherFailure(err, location))
  );
};
