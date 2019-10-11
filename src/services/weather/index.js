// @flow

import location from '../location';
import cache from '../cache';
import analytics from '../analytics';
import providers from './providers';

const DEFAULT_PROVIDER = 'yahoo';

const provider = new providers[DEFAULT_PROVIDER]();

const CACHE_ID = 'weatherCache';
const CACHE_VERSION = 'v2';
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

const cacheKey = (name: string): string => `${CACHE_ID}-${CACHE_VERSION}@${name}`;

class Weather {
  getUrl(locationConfig: string): Promise<*> {
    if (locationConfig !== 'auto') {
      return Promise.resolve(provider.createUrlFromLocation(locationConfig));
    }
    return location
      .getPosition()
      .then((position: Position) => provider.createUrlFromPosition(position));
  }

  fetch(locationConfig: string): Promise<*> {
    return cache.getItem(cacheKey(locationConfig)).then(
      cachedWeather => {
        analytics.trackEvent('weather', 'gotCache');
        return cachedWeather;
      },
      () => {
        analytics.trackEvent('weather', 'fetch');
        return this.getUrl(locationConfig)
          .then(url => provider.fetch(url))
          .then(data =>
            cache.setItem(cacheKey(locationConfig), data, { ttl: CACHE_TTL }).then(() => {
              analytics.trackEvent('weather', 'setCache');
              return data;
            }),
          )
          .catch(err => {
            analytics.trackEvent('weather', 'error');
            return Promise.reject(err);
          });
      },
    );
  }
}

const weather = new Weather();

export default weather;
