import {settings as initialState} from '../../src/config';
import settingsReducer from '../../src/reducers/settings';
import {
  SET_OPTIONS,
  setOptions
} from '../../src/actions/settings';

describe('reducers/settings', () => {

  test('should return initial state by default', () => {
    expect(settingsReducer(undefined, {})).toEqual(initialState);
  });

  test(`should handle "${SET_OPTIONS}" action type`, () => {
    let state = {};
    const action1 = setOptions({some: 'data'});
    const action2 = setOptions({some: 'data2', another: 'data'});
    state = settingsReducer(state, action1);
    expect(state).toEqual({
      some: 'data'
    });
    state = settingsReducer(state, action2);
    expect(state).toEqual({
      some: 'data2',
      another: 'data'
    });
  });

  test('should not handle other action types', () => {
    const state = {
      some: 'data'
    };
    const nextState = settingsReducer(state, {
      type: 'SOME_OTHER_ACTION_TYPE',
      options: {
        whatever: true
      }
    });
    expect(nextState).toEqual(state);
  });
});
