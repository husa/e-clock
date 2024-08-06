import messages from '../../../_locales/en/messages.json';

export type I18nMessageKey = keyof typeof messages;

export interface II18nProvider {
  t(msg: I18nMessageKey): string;
}
