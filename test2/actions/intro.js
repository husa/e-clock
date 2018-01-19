import {
  SET_INTRO,
  setIntro
} from '../../src/actions/intro';

describe('actions/intro', () => {

  describe('setIntro', () => {

    test(`should return action with "${SET_INTRO}" type`, () => {
      expect(setIntro()).toHaveProperty('type', SET_INTRO);
    });

    test('should return action with given value', () => {
      expect(setIntro(true)).toHaveProperty('value', true);
      expect(setIntro(false)).toHaveProperty('value', false);
    });

    test('should not add nothing extra', () => {
      const expected = {
        type: SET_INTRO,
        value: true
      };
      expect(setIntro(true)).toEqual(expected);
    });
  });
});
