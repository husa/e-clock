class Lang {
  t (message) {
    return chrome.i18n.getMessage(`i18n${message}`) || message;
  }
}

const lang = new Lang;

export default lang;
