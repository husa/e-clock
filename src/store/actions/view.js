export const OPEN_SETTINGS = 'OPEN_SETTINGS';
export const CLOSE_SETTINGS = 'CLOSE_SETTINGS';
export const TOGGLE_SETTINGS = 'TOGGLE_SETTINGS';

export const openSettings = () => ({
  type: OPEN_SETTINGS
});

export const closeSettings = () => ({
  type: CLOSE_SETTINGS
});

export const toggleSettings = () => ({
  type: TOGGLE_SETTINGS
});
