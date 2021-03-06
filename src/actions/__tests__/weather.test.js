import {
  WEATHER_LOAD_REQUEST,
  WEATHER_LOAD_SUCCESS,
  WEATHER_LOAD_FAILURE,

  loadWeatherRequest,
  loadWeatherSuccess,
  loadWeatherFailure,
  loadWeather
} from '../weather';

jest.mock('../../services/weather');
import weather from '../../services/weather';

describe('actions/weather', () => {
  describe('loadWeatherRequest', () => {
    it(`it should return action with "${WEATHER_LOAD_REQUEST}" type`, () => {
      expect(loadWeatherRequest()).toHaveProperty('type', WEATHER_LOAD_REQUEST);
    });

    it('should return action with location specified', () => {
      expect(loadWeatherRequest('some_location')).toHaveProperty('location', 'some_location');
    });

    it('should not add nothing extra', () => {
      const expected = {
        type: WEATHER_LOAD_REQUEST,
        location: 'some_location'
      };
      expect(loadWeatherRequest('some_location')).toEqual(expected);
    });
  });

  describe('loadWeatherSuccess', () => {
    it(`it should return action with "${WEATHER_LOAD_SUCCESS}" type`, () => {
      expect(loadWeatherSuccess()).toHaveProperty('type', WEATHER_LOAD_SUCCESS);
    });

    it('should return action with location specified', () => {
      expect(loadWeatherSuccess({}, 'some_location')).toHaveProperty('location', 'some_location');
    });

    it('should return action with data specified', () => {
      const action = loadWeatherSuccess({some: 'data'});
      expect(action).toHaveProperty('data');
      expect(action.data).toEqual({some: 'data'});
    });

    it('should not add nothing extra', () => {
      const expected = {
        type: WEATHER_LOAD_SUCCESS,
        location: 'some_location',
        data: {
          some: 'data'
        }
      };
      expect(loadWeatherSuccess({some: 'data'}, 'some_location')).toEqual(expected);
    });
  });

  describe('loadWeatherFailure', () => {
    it(`it should return action with "${WEATHER_LOAD_FAILURE}" type`, () => {
      expect(loadWeatherFailure()).toHaveProperty('type', WEATHER_LOAD_FAILURE);
    });

    it('should return action with location specified', () => {
      expect(loadWeatherFailure({}, 'some_location')).toHaveProperty('location', 'some_location');
    });

    it('should return action with error specified', () => {
      const error = new Error('stuff');
      const action = loadWeatherFailure(error);
      expect(action).toHaveProperty('error', error);
    });

    it('should not add nothing extra', () => {
      const error = new Error('stuff');
      const expected = {
        type: WEATHER_LOAD_FAILURE,
        location: 'some_location',
        error
      };
      expect(loadWeatherFailure(error, 'some_location')).toEqual(expected);
    });
  });

  describe('loadWeather', () => {
    const stubWeather = func => {
      weather.fetch = jest.fn().mockImplementation(func);
      // sinon.stub(weather, 'fetch').callsFake(func);
    };
    const location = 'some_location';
    const data = {
      some: 'data'
    };
    const error = new Error('some network or position error + metadata');

    let dispatchSpy;
    beforeEach(() => {
      dispatchSpy = jest.fn();
    });

    afterEach(() => {
      dispatchSpy = null;
    });

    it(`should dispatch "${WEATHER_LOAD_REQUEST}" action sync`, () => {
      stubWeather(() => Promise.resolve());

      loadWeather(location)(dispatchSpy);
      // sync
      expect(dispatchSpy).toHaveBeenCalledWith(loadWeatherRequest(location));
    });

    it(`should dispatch "${WEATHER_LOAD_SUCCESS}" action with loaded data async`, () => {
      stubWeather(() => Promise.resolve(data));
      return loadWeather(location)(dispatchSpy).then(() => {
        expect(dispatchSpy).toHaveBeenCalledWith(loadWeatherSuccess(data, location));
      });
    });

    it(`should dispatch "${WEATHER_LOAD_FAILURE}" action with error async`, () => {
      stubWeather(() => Promise.reject(error));
      return loadWeather(location)(dispatchSpy).then(() => {
        expect(dispatchSpy).toHaveBeenCalledWith(loadWeatherFailure(error, location));
      });
    });
  });
});
