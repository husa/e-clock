import {expect} from 'chai';

import {
  selectDock,
  selectSettings,
  selectView,
  selectIntro,

  selectWeatherError,
  selectWeatherLoading,
  selectWeatherData,

  selectForecast,
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

    it('should return empty object no data', () => {
      expect(selectWeatherData({
        settings: {useLocation: 'auto'},
        weather: {
          auto: ''
        }
      })).to.deep.equal({});
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
              city: {
                name: 'test_name',
                country: 'test_country'
              }
            }
          }
        }
      })).to.deep.equal({
        city: 'test_name',
        country: 'test_country'
      });
    });

    it('should empty object if no weather data', () => {
      expect(selectLocation({
        settings: {useLocation: 'auto'},
        weather: {
          auto: ''
        }
      })).to.deep.equal({});
    });
  });

  describe('selectForecast', () => {
    it('should return empty array if no weather data available', () => {
      expect(selectForecast({
        settings: {useLocation: 'auto'},
        weather: {
          auto: ''
        }
      })).to.deep.equal([]);
    });

    it('should accumulate weather data for specific location', () => {
      expect(selectForecast({
        settings: {useLocation: 'auto'},
        weather: {
          auto: {
            data: {
              list: [{
                temp: {
                  min: 0,
                  max: 10
                },
                weather: [{
                  icon: '123',
                  main: 'test1',
                  description: 'test1_description'
                }]
              }, {
                temp: {
                  min: 10,
                  max: 20
                },
                weather: [{
                  icon: '456',
                  main: 'test2',
                  description: 'test2_description'
                }]
              }]
            }
          }
        }
      })).to.deep.equal([{
        min: -460,
        max: -442,
        icon: '123',
        text: 'test1',
        description: 'test1_description'
      }, {
        min: -442,
        max: -424,
        icon: '456',
        text: 'test2',
        description: 'test2_description'
      }]);
    });
  });
});
