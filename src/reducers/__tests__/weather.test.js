import weatherReducer from '../weather';
import {
  WEATHER_LOAD_REQUEST,
  WEATHER_LOAD_SUCCESS,
  WEATHER_LOAD_FAILURE,

  loadWeatherRequest,
  loadWeatherSuccess,
  loadWeatherFailure
} from '../../actions/weather';

describe('reducers/weather', () => {
  const initialState = {};

  const location = 'some_location';
  it('should return initial state by default', () => {
    /* eslint no-undefined: 0 */
    expect(weatherReducer(undefined, {})).toEqual(initialState);
  });

  describe(`${WEATHER_LOAD_REQUEST}`, () => {
    it('should set "loading: true" for given location', () => {
      let state = {};
      const action = loadWeatherRequest(location);
      state = weatherReducer(state, action);
      expect(state[location]).toHaveProperty('loading', true);
    });
  });

  describe(`${WEATHER_LOAD_SUCCESS}`, () => {
    it('should set "loading: false" for given location', () => {
      let state = {};
      const action = loadWeatherSuccess({}, location);
      state = weatherReducer(state, action);
      expect(state[location]).toHaveProperty('loading', false);
    });

    it('should set "data" to action.data for given location', () => {
      let state = {};
      const action = loadWeatherSuccess({some: 'data'}, location);
      state = weatherReducer(state, action);
      expect(state[location]).toHaveProperty('data');
      expect(state[location].data).toEqual({some: 'data'});
    });
  });

  describe(`${WEATHER_LOAD_FAILURE}`, () => {
    it('should set "loading: false" for given location', () => {
      let state = {};
      const action = loadWeatherFailure({}, location);
      state = weatherReducer(state, action);
      expect(state[location]).toHaveProperty('loading', false);
    });

    it('should set "error" to action.error for given location', () => {
      let state = {};
      const error = new Error('some error');
      const action = loadWeatherFailure(error, location);
      state = weatherReducer(state, action);
      expect(state[location]).toHaveProperty('error', error);
    });
  });

  it('should not handle other action types', () => {
    const state = {};
    const nextState = weatherReducer(state, {
      type: 'SOME_OTHER_ACTION_TYPE',
      data: {some: 'data'},
      error: new Error('some error')
    });
    expect(nextState).toEqual(state);
  });
});
