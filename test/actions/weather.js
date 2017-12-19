import {expect} from 'chai';
import sinon from 'sinon';

import weather from '../../src/common/weather';
import {
  WEATHER_LOAD_REQUEST,
  WEATHER_LOAD_SUCCESS,
  WEATHER_LOAD_FAILURE,

  loadWeatherRequest,
  loadWeatherSuccess,
  loadWeatherFailure,
  loadWeather
} from '../../src/actions/weather';

describe('actions/weather', () => {

  describe('loadWeatherRequest', () => {

    it(`it should return action with "${WEATHER_LOAD_REQUEST}" type`, () => {
      expect(loadWeatherRequest()).to.have.property('type', WEATHER_LOAD_REQUEST);
    });

    it('should return action with location specified', () => {
      expect(loadWeatherRequest('some_location')).to.have.property('location', 'some_location');
    });

    it('should not add nothing extra', () => {
      const expected = {
        type: WEATHER_LOAD_REQUEST,
        location: 'some_location'
      };
      expect(loadWeatherRequest('some_location')).to.deep.equal(expected);
    });
  });

  describe('loadWeatherSuccess', () => {

    it(`it should return action with "${WEATHER_LOAD_SUCCESS}" type`, () => {
      expect(loadWeatherSuccess()).to.have.property('type', WEATHER_LOAD_SUCCESS);
    });

    it('should return action with location specified', () => {
      expect(loadWeatherSuccess({}, 'some_location')).to.have.property('location', 'some_location');
    });

    it('should return action with data specified', () => {
      const action = loadWeatherSuccess({some: 'data'});
      expect(action).to.have.property('data');
      expect(action.data).to.deep.equal({some: 'data'});
    });

    it('should not add nothing extra', () => {
      const expected = {
        type: WEATHER_LOAD_SUCCESS,
        location: 'some_location',
        data: {
          some: 'data'
        }
      };
      expect(loadWeatherSuccess({some: 'data'}, 'some_location')).to.deep.equal(expected);
    });
  });

  describe('loadWeatherFailure', () => {

    it(`it should return action with "${WEATHER_LOAD_FAILURE}" type`, () => {
      expect(loadWeatherFailure()).to.have.property('type', WEATHER_LOAD_FAILURE);
    });


    it('should return action with location specified', () => {
      expect(loadWeatherFailure({}, 'some_location')).to.have.property('location', 'some_location');
    });

    it('should return action with error specified', () => {
      const error = new Error('stuff');
      const action = loadWeatherFailure(error);
      expect(action).to.have.property('error', error);
    });

    it('should not add nothing extra', () => {
      const error = new Error('stuff');
      const expected = {
        type: WEATHER_LOAD_FAILURE,
        location: 'some_location',
        error
      };
      expect(loadWeatherFailure(error, 'some_location')).to.deep.equal(expected);
    });
  });

  describe('loadWeather', () => {
    const stubWeather = func => {
      sinon.stub(weather, 'getWeather').callsFake(func);
    };
    const location = 'some_location';
    const data = {
      some: 'data'
    };
    const error = new Error('some network or position error + metadata');

    let dispatchSpy;
    beforeEach(() => {
      dispatchSpy = sinon.spy();
    });

    afterEach(() => {
      weather.getWeather.restore();
      dispatchSpy = null;
    });

    it(`should dispatch "${WEATHER_LOAD_REQUEST}" action sync`, () => {
      stubWeather(() => Promise.resolve());

      loadWeather(location)(dispatchSpy);
      // sync
      expect(dispatchSpy.calledWith(loadWeatherRequest(location))).to.be.true;
    });

    it(`should dispatch "${WEATHER_LOAD_SUCCESS}" action with loaded data async`, () => {
      stubWeather(() => Promise.resolve(data));
      return loadWeather(location)(dispatchSpy).then(() => {
        expect(dispatchSpy.calledWith(loadWeatherSuccess(data, location))).to.be.true;
      });
    });

    it(`should dispatch "${WEATHER_LOAD_FAILURE}" action with error async`, () => {
      stubWeather(() => Promise.reject(error));
      return loadWeather(location)(dispatchSpy).then(() => {
        expect(dispatchSpy.calledWith(loadWeatherFailure(error, location))).to.be.true;
      });
    });
  });
});
