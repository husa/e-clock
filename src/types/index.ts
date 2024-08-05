import { dock } from '../config';

export interface ISettings {
  autoHideDock: boolean;
  backgroundColor: string;
  backgroundGradient: string;
  backgroundGradientAngle: string;
  backgroundImage: string;
  backgroundPattern: string;
  backgroundPriority: string;
  backgroundImageUrl: string;
  color: string;
  delimiterBlinking: boolean;
  displaySeconds: boolean;
  animateDigits: boolean;
  displayDate: boolean;
  fontFamily: string;
  fontSize: number;
  use24format: boolean;
  displayWeather: boolean;
  temperatureUnits: 'c' | 'f';
  useLocation: 'custom' | 'auto';
  customLocation: string;
}

export type DockSettings = {
  [key: string]: boolean;
};

export type DockConfig = typeof dock;
export type WeatherResponseLocation = {
  city: string;
};

export type WeatherResponseCurrent = {
  code: string;
  date: string;
  temp: number;
  text: string;
};

export type WeatherResponseForecast = Array<{
  code: string;
  date: string;
  day: string;
  max: number;
  min: number;
  text: string;
}>;

export type WeatherResponse = {
  location: WeatherResponseLocation;
  current: WeatherResponseCurrent;
  forecast: WeatherResponseForecast;
};
