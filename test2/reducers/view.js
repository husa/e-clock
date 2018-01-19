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

  test('should return initial state by default', () => {
    expect(viewReducer(undefined, {})).toEqual(initialState);
  });

  test(
    `should set "settingsOpen" to true if "${OPEN_SETTINGS}" action dispatched`,
    () => {
      const action = openSettings();
      expect(viewReducer({
        settingsOpen: false
      }, action)).toEqual({
        settingsOpen: true
      });
      expect(viewReducer({
        settingsOpen: true
      }, action)).toEqual({
        settingsOpen: true
      });
    }
  );

  test(
    `should set "settingsOpen" to false if "${CLOSE_SETTINGS}" action dispatched`,
    () => {
      const action = closeSettings();
      expect(viewReducer({
        settingsOpen: true
      }, action)).toEqual({
        settingsOpen: false
      });
      expect(viewReducer({
        settingsOpen: false
      }, action)).toEqual({
        settingsOpen: false
      });
    }
  );

  test(
    `should toggle "settingsOpen" true/false if "${TOGGLE_SETTINGS}" action dispatched`,
    () => {
      const action = toggleSettings();
      expect(viewReducer({
        settingsOpen: true
      }, action)).toEqual({
        settingsOpen: false
      });
      expect(viewReducer({
        settingsOpen: false
      }, action)).toEqual({
        settingsOpen: true
      });
    }
  );

  test('should not handle other action types', () => {
    const state = {
      settingsOpen: false
    };
    const nextState = viewReducer(state, {
      type: 'SOME_OTHER_ACTION_TYPE'
    });
    expect(nextState).toEqual(state);
  });
});
