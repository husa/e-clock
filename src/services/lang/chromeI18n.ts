class ChromeI18n {
  t(message: string): string {
    return chrome.i18n.getMessage(`i18n${message}`) || message;
  }
}

export default ChromeI18n;
