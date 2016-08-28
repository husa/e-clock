import weather from '../common/weather';

export const WEATHER_LOAD_REQUEST = 'WEATHER_LOAD_REQUEST';
export const WEATHER_LOAD_SUCCESS = 'WEATHER_LOAD_SUCCESS';
export const WEATHER_LOAD_FAILURE = 'WEATHER_LOAD_FAILURE';


export const loadWeatherRequest = () => ({
  type: WEATHER_LOAD_REQUEST
});

export const loadWeatherSuccess = data => ({
  type: WEATHER_LOAD_SUCCESS,
  data
});

export const loadWeatherFailure = err => ({
  type: WEATHER_LOAD_FAILURE,
  err
});

export const loadWeather = () => dispatch => {
  dispatch(loadWeatherRequest());

  return weather.getWeather().then(
    data => dispatch(loadWeatherSuccess(data)),
    err => dispatch(loadWeatherFailure(err))
  );
};
