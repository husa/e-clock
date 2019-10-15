// @flow

// import type {WeatherResponse} from '../../../types';

export interface WeatherProvider<URL> {
  createUrlFromLocation(string): URL;
  createUrlFromPosition(Position): URL;
  fetch(URL): Promise<*>; // WeatherResponse or error
}
