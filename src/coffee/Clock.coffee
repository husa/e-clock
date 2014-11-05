class Clock
  constructor: ->
    @$container = $ '.container'
    @$clock = @$container.find '.clock'
    @$hours = @$clock.find '.hours'
    @$minutes = @$clock.find '.minutes'
    @$delimeter = @$clock.find '.delimeter'
    @$ampm = @$clock.find '.ampm'
    @$date = @$clock.find '.date'
    @use24 = true;
    @displayDate = true;

    @updateTime();
    @interval = window.setInterval @updateTime.bind(this), 1000

  show: -> @$clock.removeClass 'initiallyHidden'

  update: (data) ->
    @updateFormat(data.use24format)
    @updateDateDisplay(data.displayDate)
    @updateDelimeter(data.delimeterBlinking)
    @updateFontFamily(data.fontFamily)
    @updateFontSize(data.fontSize)

  updateTime: (force) ->
    return unless date.timeHasChanged() or force
    @$hours.html date.getHours(@use24)
    @$minutes.html date.getMinutes()
    @$ampm.html if !@use24 then date.getAmPm() else ''
    @$date.html if @displayDate then date.getFullDate() else ''
    date.updateChangedTime()

  updateDateDisplay: (displayDate = true) ->
    @displayDate = displayDate
    @updateTime(true)

  updateFormat: (use24 = true) ->
    @use24 = use24
    @updateTime(true)

  updateDelimeter: (enabled = true) ->
    @$delimeter.toggleClass('blinking', enabled)

  updateFontFamily: (font = 'Raleway') ->
    @$clock.get(0).style.fontFamily = font

  updateFontSize: (fontSize = 12) ->
    @$clock.get(0).style.fontSize = "#{fontSize}em";
