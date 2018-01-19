/* eslint-disable */
require('dotenv').config();

global.WEATHER_API_KEY = 'some-api-key';

global.chrome = {
  i18n: {
    getMessage () {}
  },
  storage: {
    sync: {
      get () {},
      set () {}
    }
  }
};
