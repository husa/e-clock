class I18n
  constructor: ->
    for el in document.querySelectorAll '[data-i18n]'
      i18nStringKey = el.dataset.i18n
      i18nString = chrome.i18n.getMessage i18nStringKey

      if el.classList.contains 'dockicon'
        el.dataset.alt = i18nString
      else
        el.innerHTML = i18nString or i18nStringKey
