import { I18nMessageKey, II18nProvider } from './interface';

export default class ChromeI18nProvider implements II18nProvider {
  t(message: I18nMessageKey): string {
    return chrome.i18n.getMessage(message) || message;
  }
}
