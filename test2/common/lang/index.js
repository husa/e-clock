import sinon from 'sinon';

import lang from '../../../src/services/lang';

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

    test('should call chrome.i18n.getMessage', () => {
      lang.t('');
      expect(chrome.i18n.getMessage.called).toBe(true);
    });

    test('should prepend "i18n" to provided key', () => {
      lang.t('someKey');
      expect(chrome.i18n.getMessage.calledWith('i18nsomeKey')).toBe(true);
    });

    test('should return translated key if possible', () => {
      expect(lang.t('Test')).toBe('test-translated');
    });

    test('should return key if translation was not found', () => {
      const key = 'non existent key';
      expect(lang.t(key)).toBe(key);
    });
  });
});
