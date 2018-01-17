import {expect} from 'chai';

import {
  selectDock,
  selectSettings,
  selectView,
  selectIntro,

  selectWeatherError,
  selectWeatherLoading,
  selectWeatherData,

  selectWeatherForecast,
  selectLocation,

  selectLocationName
} from '../../src/selectors';

describe('selectors', () => {

  describe('selectDock', () => {
    it('should return .dock portion of the state', () => {
      expect(selectDock({dock: 'test'})).to.equal('test');
    });
  });

  describe('selectSettings', () => {
    it('should return .settings portion of the state', () => {
      expect(selectSettings({settings: 'test'})).to.equal('test');
    });
  });

  describe('selectView', () => {
    it('should return .view portion of the state', () => {
      expect(selectView({view: 'test'})).to.equal('test');
    });
  });

  describe('selectIntro', () => {
    it('should return .intro portion of the state', () => {
      expect(selectIntro({intro: 'test'})).to.equal('test');
    });
  });

  describe('selectLocationName', () => {
    it('should return customLocation is useLocation is "custom"', () => {
      expect(selectLocationName({
        settings: {
          useLocation: 'custom',
          customLocation: 'test'
        }
      })).to.equal('test');
    });

    it('should return "auto" is useLocation is "custom" but customLocation is not set', () => {
      expect(selectLocationName({
        settings: {
          useLocation: 'custom',
          customLocation: ''
        }
      })).to.equal('auto');
    });

    it('should return "auto" is useLocation is not "custom"', () => {
      expect(selectLocationName({
        settings: {
          useLocation: 'test',
          customLocation: ''
        }
      })).to.equal('auto');
    });
  });

  describe('selectWeatherData', () => {
    it('should return data for specific location', () => {
      expect(selectWeatherData({
        settings: {useLocation: 'auto'},
        weather: {
          auto: 'test'
        }
      })).to.equal('test');
    });

    it('should return null when there is no data', () => {
      expect(selectWeatherData({
        settings: {useLocation: 'auto'},
        weather: {
          auto: ''
        }
      })).to.deep.equal(null);
    });
  });

  describe('selectWeatherError', () => {
    it('should return .error prop of the weather portion', () => {
      expect(selectWeatherError({
        settings: {useLocation: 'auto'},
        weather: {
          auto: {
            error: 'test'
          }
        }
      })).to.equal('test');
    });
  });

  describe('selectWeatherLoading', () => {
    it('should return .loading prop of the weather portion', () => {
      expect(selectWeatherLoading({
        settings: {useLocation: 'auto'},
        weather: {
          auto: {
            loading: 'test'
          }
        }
      })).to.equal('test');
    });
  });

  describe('selectLocation', () => {
    it('should return city info from weather data for specific location', () => {
      expect(selectLocation({
        settings: {useLocation: 'auto'},
        weather: {
          auto: {
            data: {
              location: {
                city: 'test_name'
              }
            }
          }
        }
      })).to.deep.equal({
        city: 'test_name'
      });
    });

    it('should null if no weather data', () => {
      expect(selectLocation({
        settings: {useLocation: 'auto'},
        weather: {
          auto: null
        }
      })).to.equal(null);
    });
  });

  describe('selectWeatherForecast', () => {
    it('should return null if no weather data available', () => {
      expect(selectWeatherForecast({
        settings: {useLocation: 'auto'},
        weather: {
          auto: null
        }
      })).to.equal(null);
    });

    it('should accumulate weather data for specific location', () => {
      expect(selectWeatherForecast({
        settings: {useLocation: 'auto', temperatureUnits: 'c'},
        weather: {
          auto: {
            data: {
              forecast: [{
                code: '1',
                date: '1 Jan 2000',
                day: 'Wed',
                max: 1,
                min: 10,
                text: 'test1'
              }, {
                code: '2',
                date: '12 Jan 2000',
                day: 'Thu',
                max: 2,
                min: 20,
                text: 'test2'
              }]
            }
          }
        }
      })).to.deep.equal([{
        code: '1',
        date: '1 Jan 2000',
        day: 'Wed',
        max: 1,
        min: 10,
        text: 'test1'
      }, {
        code: '2',
        date: '12 Jan 2000',
        day: 'Thu',
        max: 2,
        min: 20,
        text: 'test2'
      }]);
    });
  });
});
