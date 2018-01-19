import introReducer from '../../src/reducers/intro';
import {
  SET_INTRO,
  setIntro
} from '../../src/actions/intro';

describe('reducers/intro', () => {
  const initialState = false;

  test('should return initial state by default', () => {
    expect(introReducer(undefined, {})).toEqual(initialState);
  });

  test(`should handle "${SET_INTRO}" action type`, () => {
    let state = false;
    const action1 = setIntro(true);
    const action2 = setIntro(false);
    expect(introReducer(state, action1)).toBe(true);
    expect(introReducer(state, action2)).toBe(false);
  });

  test('should not handle other action types', () => {
    const state = false;
    const nextState = introReducer(state, {
      type: 'SOME_OTHER_ACTION_TYPE',
      value: true
    });
    expect(nextState).toEqual(state);
  });
});
