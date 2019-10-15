// @flow

import Weather from './weather';
import location from '../location';
import cache from '../cache';
import analytics from '../analytics';
import providers from './providers';

const DEFAULT_PROVIDER = 'yahoo';

const provider = new providers[DEFAULT_PROVIDER]();

const weather = new Weather(provider, cache, analytics, location);

export default weather;
