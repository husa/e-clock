class SettingsView
  constructor: ->
    @$el = $ '.settings-popup'
    @$tabs = @$el.find '.settings-tabs'
    @$tabLinks = @$tabs.find '.settings-tab'
    @$tabsContents = @$el.find '.settings-tab-content'
    @$dockSettings = @$el.find '.settings-dock'
    @$colors = @$el.find '.settings-color-item'
    @$bgColors = @$el.find '.settings-background-color-item'
    @$bgGradients = @$el.find '.settings-background-gradient-item'
    @$bgGradientAngles = @$el.find '.settings-background-gradient-angle-item'
    @$timeFormat = @$el.find '.settings-time-format'
    @$dateDisplay = @$el.find '.settings-display-date'
    @$weatherDisplay = @$el.find '.settings-display-weather'
    @$delimeterBlinking = @$el.find '.settings-delimeter-blinking'
    @$autoHideDock = @$el.find '.settings-autohide-dock'
    @$fonts = @$el.find '.settings-font-family-item'
    @$fontSize = @$el.find '.settings-font-size-item'
    @key = 'settings_data';

    @handle()
    @initAbout()
    @$dockSettings.append(app.dock.getSettings())



  handle: ->
    @handleTabs()
    @handleClose()
    @handleTimeFormat()
    @handleDateDisplay()
    @handleWeatherDisplay()
    @handleDelimeterBlinking()
    @handleAutoHideDock()
    @handleColor()
    @handleBackgroundColor()
    @handleBackgroundGradient()
    @handleBackgroundGradientAngle()
    @handleFontFamily()
    @handleFontSize()

  update: (data) ->
    @updateTimeFormat(data.use24format)
    @updateDateDisplay(data.displayDate)
    @updateWeatherDisplay(data.displayWeather)
    @updateDelimeterBlinking(data.delimeterBlinking)
    @updateAutoHideDock(data.autoHideDock)
    @updateColor(data.color)
    @updateBackgroundColor(data.backgroundColor)
    @updateBackgroundGradient(data.backgroundGradient)
    @updateBackgroundGradientAngle(data.backgroundGradientAngle)
    @updateFontFamily(data.fontFamily)
    @updateFontSize(data.fontSize)

  open: ->
    @enable()
    @$el.removeClass 'hidden'

  close: ->
    @enable()
    @$el.addClass 'hidden'

  toggle: ->
    @enable()
    @$el.toggleClass 'hidden'

  enable: -> @$el.removeClass 'initiallyHidden'

  handleTabs: ->
    @$tabLinks.on 'click', (e) =>
      target = $ e.target
      selector = target.data 'target'

      @$tabsContents.addClass('hidden').removeClass('active')

      @$el.find(selector).removeClass 'hidden'
      @$tabLinks.removeClass 'active'
      target.addClass 'active'
      ripple(target)

  handleClose: ->
    @$el.find('.settings-close-icon').on 'click', => @close()

  updateTimeFormat: (use24format = true) ->
    @$timeFormat.removeClass('enabled', 'disabled').
      addClass(if use24format then 'enabled' else 'disabled').
      find('input').get(0).checked = use24format

  updateDateDisplay: (displayDate = true) ->
    @$dateDisplay.removeClass('enabled', 'disabled').
      addClass(if displayDate then 'enabled' else 'disabled').
      find('input').get(0).checked = displayDate

  updateWeatherDisplay: (displayWeather = true) ->
    @$weatherDisplay.removeClass('enabled', 'disabled').
      addClass(if displayWeather then 'enabled' else 'disabled').
      find('input').get(0).checked = displayWeather

  updateDelimeterBlinking: (delimeterBlinking = true) ->
    @$delimeterBlinking.removeClass('enabled', 'disabled').
      addClass(if delimeterBlinking then 'enabled' else 'disabled').
      find('input').get(0).checked = delimeterBlinking

  updateAutoHideDock: (autoHideDock = false) ->
    @$autoHideDock.removeClass('enabled', 'disabled').
      addClass(if autoHideDock then 'enabled' else 'disabled').
      find('input').get(0).checked = autoHideDock
    app.dock.toggleAutoHide(autoHideDock)

  updateColor: (color) ->
    @updateAppearanceColor(@$colors, color, '#555555')

  updateBackgroundColor: (color) ->
    @updateAppearanceColor(@$bgColors, color, '#fefefe')

  updateAppearanceColor: (nodes, color, defaultColor) ->
    color ?= defaultColor;
    for el in nodes.get()
      el.classList.remove 'active'
      el.classList.add 'active' if el.dataset.color is color
    return this

  updateBackgroundGradient: (gradient) ->
    for el in @$bgGradients.get()
      el.classList.remove 'active'
      el.classList.add 'active' if el.dataset.gradient is gradient
    return this

  updateBackgroundGradientAngle: (angle = '90deg') ->
    for el in @$bgGradientAngles.get()
      el.classList.remove 'active'
      el.classList.add 'active' if el.dataset.angle is angle
    return this

  updateFontFamily: (font = 'Raleway')->
    @$fonts.removeClass('active')
    @$fonts.parent().find("[data-font=\"#{font}\"]").addClass('active')

  updateFontSize: (fontSize = 12) ->
    value = @$fontSize.get(0).value
    if Math.round(value) isnt fontSize
      @$fontSize.get(0).value = fontSize

  handleTimeFormat: ->
    @$timeFormat.on 'mousedown', =>
      checked = !@$timeFormat.find('input').get(0).checked
      app.settingsStorage.update('use24format', checked)

  handleDateDisplay: ->
    @$dateDisplay.on 'mousedown', =>
      checked = !@$dateDisplay.find('input').get(0).checked
      app.settingsStorage.update('displayDate', checked)

  handleWeatherDisplay: ->
    @$weatherDisplay.on 'mousedown', =>
      checked = !@$weatherDisplay.find('input').get(0).checked
      app.settingsStorage.update('displayWeather', checked)

  handleDelimeterBlinking: ->
    @$delimeterBlinking.on 'mousedown', =>
      checked = !@$delimeterBlinking.find('input').get(0).checked
      app.settingsStorage.update('delimeterBlinking', checked)

  handleAutoHideDock: ->
    @$autoHideDock.on 'mousedown', =>
      checked = !@$autoHideDock.find('input').get(0).checked
      app.settingsStorage.update('autoHideDock', checked)

  handleColor: ->
    @$colors.on 'click', ->
      color = this.dataset.color
      app.settingsStorage.update('color', color)

  handleBackgroundColor: ->
    @$bgColors.on 'click', ->
      color = this.dataset.color
      app.settingsStorage.update('backgroundPriority', 'color', {silent : true})
      app.settingsStorage.update('backgroundColor', color)

  handleBackgroundGradient: ->
    @$bgGradients.on 'click', ->
      gradient = this.dataset.gradient
      app.settingsStorage.update('backgroundPriority', 'gradient', {silent : true})
      app.settingsStorage.update('backgroundGradient', gradient)

  handleBackgroundGradientAngle: ->
    @$bgGradientAngles.on 'click', ->
      angle = this.dataset.angle
      app.settingsStorage.update('backgroundGradientAngle', angle)

  handleFontFamily: ->
    @$fonts.on 'click', ->
      font = this.dataset.font
      app.settingsStorage.update('fontFamily', font)

  handleFontSize: ->
    prevValue = 0
    @$fontSize.on 'input', ->
      value = Math.round this.value
      if value isnt prevValue
        prevValue = value
        app.settingsStorage.update('fontSize', value, {dontSync: true})
    @$fontSize.on 'change', ->
      value = Math.round this.value
      prevValue = value
      app.settingsStorage.update('fontSize', value)

  initAbout: ->
    manifest = chrome.runtime.getManifest();
    @$el.find('.settings-about-name').html manifest.name
    @$el.find('.settings-about-version').html "v#{manifest.version}"
    @$el.find('.settings-about-rate').get(0).href = "https://chrome.google.com/webstore/detail/#{chrome.runtime.id}"
