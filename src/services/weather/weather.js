// @flow

import type { WeatherProvider } from './providers/interface';
import Cache from '../cache/cache';
import Analytics from '../analytics/analytics';
import Location from '../location/location';

const CACHE_ID = 'weatherCache';
const CACHE_VERSION = 'v3';
const CACHE_TTL = 1 * 60 * 60 * 1000; // 1 hour

const cacheKey = (name: string): string => `${CACHE_ID}-${CACHE_VERSION}@${name}`;

class Weather {
  provider: WeatherProvider<*>;
  cache: Cache;
  analytics: Analytics;
  location: Location;

  constructor(
    provider: WeatherProvider<*>,
    cache: Cache,
    analytics: Analytics,
    location: Location,
  ) {
    this.provider = provider;
    this.cache = cache;
    this.analytics = analytics;
    this.location = location;
  }

  getUrl(locationConfig: string): Promise<*> {
    if (locationConfig !== 'auto') {
      return Promise.resolve(this.provider.createUrlFromLocation(locationConfig));
    }
    return this.location
      .getPosition()
      .then((position: Position) => this.provider.createUrlFromPosition(position));
  }

  fetch(locationConfig: string): Promise<*> {
    return this.cache.getItem(cacheKey(locationConfig)).then(
      cachedWeather => {
        this.analytics.trackEvent('weather', 'gotCache');
        return cachedWeather;
      },
      () => {
        this.analytics.trackEvent('weather', 'fetch');
        return this.getUrl(locationConfig)
          .then(url => this.provider.fetch(url))
          .then(data =>
            this.cache.setItem(cacheKey(locationConfig), data, { ttl: CACHE_TTL }).then(() => {
              this.analytics.trackEvent('weather', 'setCache');
              return data;
            }),
          )
          .catch(err => {
            this.analytics.trackEvent('weather', 'error');
            return Promise.reject(err);
          });
      },
    );
  }
}

export default Weather;
