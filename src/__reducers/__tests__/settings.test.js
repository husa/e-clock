import {settings as initialState} from '../../config';
import settingsReducer from '../settings';
import {
  SET_OPTIONS,
  setOptions
} from '../../actions/settings';

describe('reducers/settings', () => {
  it('should return initial state by default', () => {
    /* eslint no-undefined: 0 */
    expect(settingsReducer(undefined, {})).toEqual(initialState);
  });

  it(`should handle "${SET_OPTIONS}" action type`, () => {
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

  it('should not handle other action types', () => {
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
