import { II18nProvider } from './interface';

export default class ChromeI18nProvider implements II18nProvider {
  t(message: string): string {
    return chrome.i18n.getMessage(`i18n${message}`) || message;
  }
}
