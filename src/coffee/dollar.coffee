class $
  constructor: (selector) ->
    return new $(selector) if this not instanceof $
    return selector if selector instanceof $
    if typeof selector is 'string'
      els = document.querySelectorAll(selector)
      @els = Array::slice.call(els)
    @els = [selector] if selector instanceof HTMLElement or selector instanceof DocumentFragment
    @els = selector if selector instanceof Array
    return this

  get: (index) ->
    return @els if not index?
    return @els[index]

  addClass: (classNames...)->
    el.classList.add.apply(el.classList, classNames) for el in @els
    return this

  removeClass: (classNames...) ->
    el.classList.remove.apply(el.classList, classNames) for el in @els
    return this

  toggleClass: (className, priority) ->
    el.classList.toggle.apply(el.classList, arguments) for el in @els

  hasClass: (className) ->
    @els.every (el) -> el.classList.contains(className)

  on: (event, callback, phase = false) ->
    el.addEventListener(event, callback, phase) for el in @els
    return this

  off: (event, callback, phase = false) ->
    el.addEventListener(event, callback, phase) for el in @els
    return this

  find: (selector) ->
    found = []
    found.push.apply(found, el.querySelectorAll(selector)) for el in @els
    return $(found)

  html: (str) ->
    return @els[0].innerHTML if not str?
    el.innerHTML = str for el in @els
    return this

  data: (key) ->
    return @els[0].dataset if not key?
    return @els[0].dataset[key]

  append: (elem) ->
    elem = elem.get(0) if elem instanceof $
    el.appendChild(elem) for el in @els

  parent: () ->
    return $(@els[0].parentNode)
