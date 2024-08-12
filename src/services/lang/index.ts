import ChromeI18nProvider from './providers/chromeI18n';
import { II18nProvider } from './providers/interface';
import LocalI18nProvider from './providers/local';

let lang: II18nProvider;

if (process.env.NODE_ENV !== 'development') {
  lang = new ChromeI18nProvider();
} else {
  lang = new LocalI18nProvider();
}

export default lang;
