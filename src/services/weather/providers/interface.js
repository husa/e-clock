// @flow

// import type {WeatherResponse} from '../../../types';

export interface WeatherProvider {
  createUrlFromLocation (string): string,
  createUrlFromPosition (Position): string,
  fetch (string): Promise<*> // WeatherResponse or error
}
