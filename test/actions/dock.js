import {expect} from 'chai';

import {
  SET_DOCK_OPTIONS,
  setDockOptions
} from '../../src/actions/dock';

describe('actions/dock', () => {

  describe('setDockOptions', () => {

    it(`should return action with "${SET_DOCK_OPTIONS}" type`, () => {
      expect(setDockOptions()).to.have.property('type', SET_DOCK_OPTIONS);
    });

    it('should return action with prop "options" and value given object', () => {
      const action = setDockOptions({stuff: true});
      expect(action).to.have.property('options');
      expect(action.options).to.deep.equal({stuff: true});
    });

    it('should not add nothing extra', () => {
      const expected = {
        type: SET_DOCK_OPTIONS,
        options: {
          smth: 10
        }
      };
      expect(setDockOptions({smth: 10})).to.deep.equal(expected);
    });
  });
});
