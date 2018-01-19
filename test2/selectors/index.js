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
    test('should return .dock portion of the state', () => {
      expect(selectDock({dock: 'test'})).toBe('test');
    });
  });

  describe('selectSettings', () => {
    test('should return .settings portion of the state', () => {
      expect(selectSettings({settings: 'test'})).toBe('test');
    });
  });

  describe('selectView', () => {
    test('should return .view portion of the state', () => {
      expect(selectView({view: 'test'})).toBe('test');
    });
  });

  describe('selectIntro', () => {
    test('should return .intro portion of the state', () => {
      expect(selectIntro({intro: 'test'})).toBe('test');
    });
  });

  describe('selectLocationName', () => {
    test('should return customLocation is useLocation is "custom"', () => {
      expect(selectLocationName({
        settings: {
          useLocation: 'custom',
          customLocation: 'test'
        }
      })).toBe('test');
    });

    test(
      'should return "auto" is useLocation is "custom" but customLocation is not set',
      () => {
        expect(selectLocationName({
          settings: {
            useLocation: 'custom',
            customLocation: ''
          }
        })).toBe('auto');
      }
    );

    test('should return "auto" is useLocation is not "custom"', () => {
      expect(selectLocationName({
        settings: {
          useLocation: 'test',
          customLocation: ''
        }
      })).toBe('auto');
    });
  });

  describe('selectWeatherData', () => {
    test('should return data for specific location', () => {
      expect(selectWeatherData({
        settings: {useLocation: 'auto'},
        weather: {
          auto: 'test'
        }
      })).toBe('test');
    });

    test('should return null when there is no data', () => {
      expect(selectWeatherData({
        settings: {useLocation: 'auto'},
        weather: {
          auto: ''
        }
      })).toEqual(null);
    });
  });

  describe('selectWeatherError', () => {
    test('should return .error prop of the weather portion', () => {
      expect(selectWeatherError({
        settings: {useLocation: 'auto'},
        weather: {
          auto: {
            error: 'test'
          }
        }
      })).toBe('test');
    });
  });

  describe('selectWeatherLoading', () => {
    test('should return .loading prop of the weather portion', () => {
      expect(selectWeatherLoading({
        settings: {useLocation: 'auto'},
        weather: {
          auto: {
            loading: 'test'
          }
        }
      })).toBe('test');
    });
  });

  describe('selectLocation', () => {
    test('should return city info from weather data for specific location', () => {
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
      })).toEqual({
        city: 'test_name'
      });
    });

    test('should null if no weather data', () => {
      expect(selectLocation({
        settings: {useLocation: 'auto'},
        weather: {
          auto: null
        }
      })).toBe(null);
    });
  });

  describe('selectWeatherForecast', () => {
    test('should return null if no weather data available', () => {
      expect(selectWeatherForecast({
        settings: {useLocation: 'auto'},
        weather: {
          auto: null
        }
      })).toBe(null);
    });

    test('should accumulate weather data for specific location', () => {
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
      })).toEqual([{
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
