import {
  SET_OPTIONS,
  setOptions
} from '../../src/actions/settings';

describe('actions/settings', () => {

  describe('setOptions', () => {

    test(`should return action with "${SET_OPTIONS}" type`, () => {
      expect(setOptions()).toHaveProperty('type', SET_OPTIONS);
    });

    test('should return action with prop "options" and value given object', () => {
      const action = (setOptions({stuff: true}));
      expect(action).toHaveProperty('options');
      expect(action.options).toEqual({stuff: true});
    });

    test('should not add nothing extra', () => {
      const expected = {
        type: SET_OPTIONS,
        options: {
          smth: 10
        }
      };
      expect(setOptions({smth: 10})).toEqual(expected);
    });
  });
});
