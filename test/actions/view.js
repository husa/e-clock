import {expect} from 'chai';

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

    it(`should return action with "${OPEN_SETTINGS}" type`, () => {
      expect(openSettings()).to.have.property('type', OPEN_SETTINGS);
      expect(openSettings()).to.deep.equal({
        type: OPEN_SETTINGS
      });
    });
  });

  describe('closeSettings', () => {

    it(`should return action with "${CLOSE_SETTINGS}" type`, () => {
      expect(closeSettings()).to.have.property('type', CLOSE_SETTINGS);
      expect(closeSettings()).to.deep.equal({
        type: CLOSE_SETTINGS
      });
    });
  });

  describe('toggleSettings', () => {

    it(`should return action with "${TOGGLE_SETTINGS}" type`, () => {
      expect(toggleSettings()).to.have.property('type', TOGGLE_SETTINGS);
      expect(toggleSettings()).to.deep.equal({
        type: TOGGLE_SETTINGS
      });
    });
  });
});
