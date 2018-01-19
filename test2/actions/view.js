import {
  OPEN_SETTINGS,
  CLOSE_SETTINGS,
  TOGGLE_SETTINGS,

  openSettings,
  closeSettings,
  toggleSettings
} from '../../src/actions/view';

describe('actions/view', () => {

  describe('openSettings', () => {

    test(`should return action with "${OPEN_SETTINGS}" type`, () => {
      expect(openSettings()).toHaveProperty('type', OPEN_SETTINGS);
      expect(openSettings()).toEqual({
        type: OPEN_SETTINGS
      });
    });
  });

  describe('closeSettings', () => {

    test(`should return action with "${CLOSE_SETTINGS}" type`, () => {
      expect(closeSettings()).toHaveProperty('type', CLOSE_SETTINGS);
      expect(closeSettings()).toEqual({
        type: CLOSE_SETTINGS
      });
    });
  });

  describe('toggleSettings', () => {

    test(`should return action with "${TOGGLE_SETTINGS}" type`, () => {
      expect(toggleSettings()).toHaveProperty('type', TOGGLE_SETTINGS);
      expect(toggleSettings()).toEqual({
        type: TOGGLE_SETTINGS
      });
    });
  });
});
