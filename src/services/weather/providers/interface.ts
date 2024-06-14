export interface WeatherProvider<URLQuery> {
  createUrlFromLocation(location: string): URLQuery;
  createUrlFromPosition(p: GeolocationPosition): URLQuery;
  fetch(url: URLQuery): Promise<any>; // WeatherResponse or error
}
