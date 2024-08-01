import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../createStore';

export interface SettingsState {
  autoHideDock: boolean;
  backgroundColor: string;
  backgroundGradient: string;
  backgroundGradientAngle: string;
  backgroundImage: string;
  backgroundPattern: string;
  backgroundPriority: 'color' | 'gradient' | 'pattern' | 'image' | 'url';
  backgroundImageUrl: string;
  color: string;
  delimiterBlinking: boolean;
  displaySeconds: boolean;
  animateDigits: boolean;
  displayDate: boolean;
  fontFamily: string;
  fontSize: string;
  use24format: boolean;
  displayWeather: boolean;
  temperatureUnits: 'c' | 'f';
  useLocation: 'custom' | 'auto';
  customLocation: string;
}

export const initialState: SettingsState = {
  autoHideDock: false,
  backgroundColor: '#fefefe',
  backgroundGradient: '#606c88,#3f4c6b',
  backgroundGradientAngle: '135deg',
  backgroundImage: '22',
  backgroundPattern: '1',
  backgroundPriority: 'image', // [color, gradient, pattern, image, url]
  backgroundImageUrl: '',
  color: '#3e3e3e',
  delimiterBlinking: true,
  displaySeconds: true,
  animateDigits: true,
  displayDate: true,
  fontFamily: 'Raleway',
  fontSize: '10',
  use24format: true,
  displayWeather: true,
  temperatureUnits: 'c',
  useLocation: 'auto', // 'auto' / 'custom'
  customLocation: '',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setOptions(state, action: PayloadAction<Partial<SettingsState>>) {
      for (const settingsOption in action.payload) {
        state[settingsOption] = action.payload[settingsOption];
      }
    },
  },
});

export const { setOptions } = settingsSlice.actions;

export const selectSettings = (state: AppState) => state.settings;

export const useSettingsSlice = () => {
  const state = useSelector(selectSettings);
  const dispatch = useDispatch();

  return {
    state,
    setSettingsOption: (options: Partial<SettingsState>) => dispatch(setOptions(options)),
  };
};

export default settingsSlice.reducer;
