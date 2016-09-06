import {expect} from 'chai';

import {
  SET_INTRO,
  setIntro
} from '../../src/actions/intro';

describe('actions/intro', () => {

  describe('setIntro', () => {

    it(`should return action with "${SET_INTRO}" type`, () => {
      expect(setIntro()).to.have.property('type', SET_INTRO);
    });

    it('should return action with given value', () => {
      expect(setIntro(true)).to.have.property('value', true);
      expect(setIntro(false)).to.have.property('value', false);
    });

    it('should not add nothing extra', () => {
      const expected = {
        type: SET_INTRO,
        value: true
      };
      expect(setIntro(true)).to.deep.equal(expected);
    });
  });
});
