import {
  SET_DOCK_OPTIONS,
  setDockOptions
} from '../../src/actions/dock';

describe('actions/dock', () => {

  describe('setDockOptions', () => {

    test(`should return action with "${SET_DOCK_OPTIONS}" type`, () => {
      expect(setDockOptions()).toHaveProperty('type', SET_DOCK_OPTIONS);
    });

    test('should return action with prop "options" and value given object', () => {
      const action = setDockOptions({stuff: true});
      expect(action).toHaveProperty('options');
      expect(action.options).toEqual({stuff: true});
    });

    test('should not add nothing extra', () => {
      const expected = {
        type: SET_DOCK_OPTIONS,
        options: {
          smth: 10
        }
      };
      expect(setDockOptions({smth: 10})).toEqual(expected);
    });
  });
});
