import lang from '.';
import { I18nMessageKey } from './providers/interface';

describe('Lang', () => {
  const originalI18n = chrome.i18n;

  beforeEach(() => {
    chrome.i18n.getMessage = jest.fn();
  });

  afterEach(() => {
    chrome.i18n = originalI18n;
  });

  describe('t', () => {
    it('should call chrome.i18n.getMessage', () => {
      lang.t('i18nShortDescription');
      expect((chrome.i18n.getMessage as jest.Mock).mock.calls.length > 0).toBe(true);
    });

    it('should return key if translation was not found', () => {
      const key = 'non existent key';
      expect(lang.t(key as I18nMessageKey)).toBe(key);
    });
  });
});
