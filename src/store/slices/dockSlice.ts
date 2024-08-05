import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DockURL } from '../../config/dock';
import { AppState } from '../createStore';
import { useDispatch, useSelector } from 'react-redux';

export type DockState = {
  [key in DockURL]?: boolean;
};

export const initialState: DockState = {};

export const dockSlice = createSlice({
  name: 'dock',
  initialState,
  reducers: {
    setOptions(state, action: PayloadAction<DockState>) {
      for (const dockOption in action.payload) {
        state[dockOption] = action.payload[dockOption];
      }
    },
  },
});

export const { setOptions } = dockSlice.actions;

export const selectDock = (state: AppState) => state.dock;

export const useDockSettingsSlice = () => {
  const state = useSelector(selectDock);
  const dispatch = useDispatch();

  return {
    state,
    setDockOptions: (options: DockState) => dispatch(setOptions(options)),
  };
};

export default dockSlice.reducer;
