import {
  SET_INTRO,
  setIntro
} from '../intro';

describe('actions/intro', () => {
  describe('setIntro', () => {
    it(`should return action with "${SET_INTRO}" type`, () => {
      expect(setIntro()).toHaveProperty('type', SET_INTRO);
    });

    it('should return action with given value', () => {
      expect(setIntro(true)).toHaveProperty('value', true);
      expect(setIntro(false)).toHaveProperty('value', false);
    });

    it('should not add nothing extra', () => {
      const expected = {
        type: SET_INTRO,
        value: true
      };
      expect(setIntro(true)).toEqual(expected);
    });
  });
});
