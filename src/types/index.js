// @flow

export type WeatherResponseLocation = {
  city: string
};

export type WeatherResponseCurrent = {
  code: string,
  date: string,
  temp: number,
  text: string
};

export type WeatherResponseForecast = Array<{
  code: string,
  date: string,
  day: string,
  max: number,
  min: number,
  text: string
}>;

export type WeatherResponse = {
  location: WeatherResponseLocation,
  current: WeatherResponseCurrent,
  forecast: WeatherResponseForecast
};
