/* eslint-disable */
require('dotenv').config();

global.WEATHER_API_KEY = process.env.WEATHER_API_KEY;

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
