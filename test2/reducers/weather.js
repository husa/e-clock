import weatherReducer from '../../src/reducers/weather';
import {
  WEATHER_LOAD_REQUEST,
  WEATHER_LOAD_SUCCESS,
  WEATHER_LOAD_FAILURE,

  loadWeatherRequest,
  loadWeatherSuccess,
  loadWeatherFailure
} from '../../src/actions/weather';

describe('reducers/intro', () => {
  const initialState = {};

  const location = 'some_location';
  test('should return initial state by default', () => {
    expect(weatherReducer(undefined, {})).toEqual(initialState);
  });

  describe(`${WEATHER_LOAD_REQUEST}`, () => {
    test('should set "loading: true" for given location', () => {
      let state = {};
      const action = loadWeatherRequest(location);
      state = weatherReducer(state, action);
      expect(state[location]).toHaveProperty('loading', true);
    });
  });

  describe(`${WEATHER_LOAD_SUCCESS}`, () => {
    test('should set "loading: false" for given location', () => {
      let state = {};
      const action = loadWeatherSuccess({}, location);
      state = weatherReducer(state, action);
      expect(state[location]).toHaveProperty('loading', false);
    });

    test('should set "data" to action.data for given location', () => {
      let state = {};
      const action = loadWeatherSuccess({some: 'data'}, location);
      state = weatherReducer(state, action);
      expect(state[location]).toHaveProperty('data');
      expect(state[location].data).toEqual({some: 'data'});
    });

  });

  describe(`${WEATHER_LOAD_FAILURE}`, () => {
    test('should set "loading: false" for given location', () => {
      let state = {};
      const action = loadWeatherFailure({}, location);
      state = weatherReducer(state, action);
      expect(state[location]).toHaveProperty('loading', false);
    });

    test('should set "error" to action.error for given location', () => {
      let state = {};
      const error = new Error('some error');
      const action = loadWeatherFailure(error, location);
      state = weatherReducer(state, action);
      expect(state[location]).toHaveProperty('error', error);
    });
  });

  test('should not handle other action types', () => {
    const state = {};
    const nextState = weatherReducer(state, {
      type: 'SOME_OTHER_ACTION_TYPE',
      data: {some: 'data'},
      error: new Error('some error')
    });
    expect(nextState).toEqual(state);
  });
});
