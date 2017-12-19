import {expect} from 'chai';
import sinon from 'sinon';

import lang from '../../../src/common/lang';

describe('Lang', () => {
  describe('t', () => {

    beforeEach(() => {
      sinon.stub(
        chrome.i18n,
        'getMessage'
      ).callsFake(key => key === 'i18nTest' ? 'test-translated' : null);
    });

    afterEach(() => {
      chrome.i18n.getMessage.restore();
    });

    it('should call chrome.i18n.getMessage', () => {
      lang.t('');
      expect(chrome.i18n.getMessage.called).to.be.true;
    });

    it('should prepend "i18n" to provided key', () => {
      lang.t('someKey');
      expect(chrome.i18n.getMessage.calledWith('i18nsomeKey')).to.be.true;
    });

    it('should return translated key if possible', () => {
      expect(lang.t('Test')).to.equal('test-translated');
    });

    it('should return key if translation was not found', () => {
      const key = 'non existent key';
      expect(lang.t(key)).to.equal(key);
    });
  });
});
