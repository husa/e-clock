import { II18nProvider } from './interface';

export default class LocalI18nProvider implements II18nProvider {
  t(key: string) {
    return key;
  }
}
