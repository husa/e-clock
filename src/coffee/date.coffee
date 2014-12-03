date =
  prev:
    hours: -1
    minutes: -1

  getDate: -> new Date()

  getHours: (use24) ->
    hours = @getDate().getHours()
    if use24 or not (hours // 13) then hours else hours - 12

  getMinutes: ->
    minutes = @getDate().getMinutes()
    "#{if minutes < 10 then 0 else ''}#{minutes}"

  timeHasChanged: ->
    +@getMinutes() isnt +@prev.minutes or +@getHours() isnt +@prev.hours

  updateChangedTime: ->
    @prev.minutes = @getMinutes()
    @prev.hours = @getHours()

  getAmPm: ->
    if @getHours(true) < 12 then 'am' else 'pm'

  getFullDate: ->
    current = @getDate()
    day = chrome.i18n.getMessage("i18nDay#{current.getDay()}")
    month = chrome.i18n.getMessage("i18nMonth#{current.getMonth()}").slice(0, 3)
    "#{day}, #{month} #{current.getDate()} "
