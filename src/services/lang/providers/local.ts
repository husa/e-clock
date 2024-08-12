import { II18nProvider } from './interface';
import localeMessages from '../../../_locales/en/messages.json';

export default class LocalI18nProvider implements II18nProvider {
  t(key: string) {
    return localeMessages[key].message;
  }
}
