import {
  WEATHER_LOAD_REQUEST,
  WEATHER_LOAD_SUCCESS,
  WEATHER_LOAD_FAILURE
} from '../actions/weather';

const initialState = {};

const initialWeatherState = {
  loading: false,
  data: null,
  error: null
};

function weather (state = initialState, action) {
  if ([
    WEATHER_LOAD_REQUEST,
    WEATHER_LOAD_SUCCESS,
    WEATHER_LOAD_FAILURE
  ].includes(action.type)) {
    const {location} = action;
    return Object.assign({}, state, {
      [location]: weatherItem(state[location], action)
    });
  }

  return Object.assign({}, state);
}

function weatherItem (state = initialWeatherState, action) {
  switch (action.type) {

    case WEATHER_LOAD_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case WEATHER_LOAD_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.data
      });

    case WEATHER_LOAD_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });

    default:
      return Object.assign({}, state);
  }
}

export default weather;
