import {expect} from 'chai';

import {
  SET_OPTIONS,
  setOptions
} from '../../src/actions/settings';

describe('actions/settings', () => {

  describe('setOptions', () => {

    it(`should return action with "${SET_OPTIONS}" type`, () => {
      expect(setOptions()).to.have.property('type', SET_OPTIONS);
    });

    it('should return action with prop "options" and value given object', () => {
      const action = (setOptions({stuff: true}));
      expect(action).to.have.property('options');
      expect(action.options).to.deep.equal({stuff: true});
    });

    it('should not add nothing extra', () => {
      const expected = {
        type: SET_OPTIONS,
        options: {
          smth: 10
        }
      };
      expect(setOptions({smth: 10})).to.deep.equal(expected);
    });
  });
});
