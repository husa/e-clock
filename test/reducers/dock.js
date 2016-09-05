import {expect} from 'chai';

import dockReducer from '../../src/reducers/dock';
import {
  SET_DOCK_OPTIONS,
  setDockOptions
} from '../../src/actions/dock';

describe('reducers/dock', () => {
  const initialState = {};

  it('should return initial state by default', () => {
    expect(dockReducer(undefined, {})).to.deep.equal(initialState);
  });

  it(`should handle "${SET_DOCK_OPTIONS}" action type`, () => {
    let state = {};
    const action1 = setDockOptions({some: 'data'});
    const action2 = setDockOptions({some: 'data2', another: 'data'});
    state = dockReducer(state, action1);
    expect(state).to.deep.equal({
      some: 'data'
    });
    state = dockReducer(state, action2);
    expect(state).to.deep.equal({
      some: 'data2',
      another: 'data'
    });
  });

  it('should not handle other action types', () => {
    const state = {
      some: 'data'
    };
    const nextState = dockReducer(state, {
      type: 'SOME_OTHER_ACTION_TYPE',
      options: {
        whatever: true
      }
    });
    expect(nextState).to.deep.equal(state);
  });
});
