import {expect} from 'chai';

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
  it('should return initial state by default', () => {
    expect(weatherReducer(undefined, {})).to.deep.equal(initialState);
  });

  describe(`${WEATHER_LOAD_REQUEST}`, () => {
    it('should set "loading: true" for given location', () => {
      let state = {};
      const action = loadWeatherRequest(location);
      state = weatherReducer(state, action);
      expect(state[location]).to.have.property('loading', true);
    });
  });

  describe(`${WEATHER_LOAD_SUCCESS}`, () => {
    it('should set "loading: false" for given location', () => {
      let state = {};
      const action = loadWeatherSuccess({}, location);
      state = weatherReducer(state, action);
      expect(state[location]).to.have.property('loading', false);
    });

    it('should set "data" to action.data for given location', () => {
      let state = {};
      const action = loadWeatherSuccess({some: 'data'}, location);
      state = weatherReducer(state, action);
      expect(state[location]).to.have.property('data');
      expect(state[location].data).to.deep.equal({some: 'data'});
    });

  });

  describe(`${WEATHER_LOAD_FAILURE}`, () => {
    it('should set "loading: false" for given location', () => {
      let state = {};
      const action = loadWeatherFailure({}, location);
      state = weatherReducer(state, action);
      expect(state[location]).to.have.property('loading', false);
    });

    it('should set "error" to action.error for given location', () => {
      let state = {};
      const error = new Error('some error');
      const action = loadWeatherFailure(error, location);
      state = weatherReducer(state, action);
      expect(state[location]).to.have.property('error', error);
    });
  });

  it('should not handle other action types', () => {
    const state = {};
    const nextState = weatherReducer(state, {
      type: 'SOME_OTHER_ACTION_TYPE',
      data: {some: 'data'},
      error: new Error('some error')
    });
    expect(nextState).to.deep.equal(state);
  });
});
