import lang from '..//lang';

describe('Lang', () => {
  let originalI18n = chrome.i18n;

  beforeEach(() => {
    chrome.i18n.getMessage = jest.fn().mockImplementation(
      key => key === 'i18nTest' ? 'test-translated' : null
    );
  });

  afterEach(() => {
    chrome.i18n = originalI18n;
  });

  describe('t', () => {
    it('should call chrome.i18n.getMessage', () => {
      lang.t('');
      expect(chrome.i18n.getMessage.mock.calls.length > 0).toBe(true);
    });

    it('should prepend "i18n" to provided key', () => {
      lang.t('someKey');
      expect(chrome.i18n.getMessage).toHaveBeenCalledWith('i18nsomeKey');
    });

    it('should return translated key if possible', () => {
      expect(lang.t('Test')).toBe('test-translated');
    });

    it('should return key if translation was not found', () => {
      const key = 'non existent key';
      expect(lang.t(key)).toBe(key);
    });
  });
});
