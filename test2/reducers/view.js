import {expect} from 'chai';

import viewReducer from '../../src/reducers/view';
import {
  OPEN_SETTINGS,
  CLOSE_SETTINGS,
  TOGGLE_SETTINGS,
  openSettings,
  closeSettings,
  toggleSettings
} from '../../src/actions/view';

describe('reducers/view', () => {
  const initialState = {
    settingsOpen: false
  };

  it('should return initial state by default', () => {
    expect(viewReducer(undefined, {})).to.deep.equal(initialState);
  });

  it(`should set "settingsOpen" to true if "${OPEN_SETTINGS}" action dispatched`, () => {
    const action = openSettings();
    expect(viewReducer({
      settingsOpen: false
    }, action)).to.deep.equal({
      settingsOpen: true
    });
    expect(viewReducer({
      settingsOpen: true
    }, action)).to.deep.equal({
      settingsOpen: true
    });
  });

  it(`should set "settingsOpen" to false if "${CLOSE_SETTINGS}" action dispatched`, () => {
    const action = closeSettings();
    expect(viewReducer({
      settingsOpen: true
    }, action)).to.deep.equal({
      settingsOpen: false
    });
    expect(viewReducer({
      settingsOpen: false
    }, action)).to.deep.equal({
      settingsOpen: false
    });
  });

  it(`should toggle "settingsOpen" true/false if "${TOGGLE_SETTINGS}" action dispatched`, () => {
    const action = toggleSettings();
    expect(viewReducer({
      settingsOpen: true
    }, action)).to.deep.equal({
      settingsOpen: false
    });
    expect(viewReducer({
      settingsOpen: false
    }, action)).to.deep.equal({
      settingsOpen: true
    });
  });

  it('should not handle other action types', () => {
    const state = {
      settingsOpen: false
    };
    const nextState = viewReducer(state, {
      type: 'SOME_OTHER_ACTION_TYPE'
    });
    expect(nextState).to.deep.equal(state);
  });
});
