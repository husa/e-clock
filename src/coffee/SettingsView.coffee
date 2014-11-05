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
    @$delimeterBlinking = @$el.find '.settings-delimeter-blinking'
    @$autoHideDock = @$el.find '.settings-autohide-dock'
    @$fonts = @$el.find '.settings-font-family-item'
    @key = 'settings_data';

    @handle()
    @initAbout()
    @$dockSettings.append(app.dock.getSettings())

  handle: ->
    @handleTabs()
    @handleClose()
    @handleTimeFormat()
    @handleDelimeterBlinking()
    @handleAutoHideDock()
    @handleColor()
    @handleBackgroundColor()
    @handleBackgroundGradient()
    @handleBackgroundGradientAngle()
    @handleFontFamily()

  update: (data) ->
    @updateTimeFormat(data.use24format)
    @updateDelimeterBlinking(data.delimeterBlinking)
    @updateAutoHideDock(data.autoHideDock)
    @updateColor(data.color)
    @updateBackgroundColor(data.backgroundColor)
    @updateBackgroundGradient(data.backgroundGradient)
    @updateBackgroundGradientAngle(data.backgroundGradientAngle)
    @updateFontFamily(data.fontFamily)

  open: -> @$el.removeClass 'hidden'

  close: -> @$el.addClass 'hidden'

  toggle: -> @$el.toggleClass 'hidden'

  handleTabs: ->
    @$tabLinks.on 'click', (e) =>
      target = $ e.target
      selector = target.data 'target'

      @$tabsContents.addClass('hidden').removeClass('active')

      @$el.find(selector).removeClass 'hidden'
      @$tabLinks.removeClass 'active'
      target.addClass 'active'

  handleClose: ->
    @$el.find('.settings-close-icon').on 'click', => @close()

  updateTimeFormat: (use24format = true) ->
    @$timeFormat.removeClass('enabled', 'disabled').
      addClass(if use24format then 'enabled' else 'disabled').
      find('input').get(0).checked = use24format

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

  handleTimeFormat: ->
    @$timeFormat.on 'mousedown', =>
      checked = !@$timeFormat.find('input').get(0).checked
      app.settingsStorage.update('use24format', checked)

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
      color = this.dataset.color;
      app.settingsStorage.update('backgroundPriority', 'color', true);
      app.settingsStorage.update('backgroundColor', color);

  handleBackgroundGradient: ->
    @$bgGradients.on 'click', ->
      gradient = this.dataset.gradient;
      app.settingsStorage.update('backgroundPriority', 'gradient', true)
      app.settingsStorage.update('backgroundGradient', gradient)

  handleBackgroundGradientAngle: ->
    @$bgGradientAngles.on 'click', ->
      angle = this.dataset.angle
      app.settingsStorage.update('backgroundGradientAngle', angle)

  handleFontFamily: ->
    @$fonts.on 'click', ->
      font = this.dataset.font
      app.settingsStorage.update('fontFamily', font)

  initAbout: ->
    manifest = chrome.runtime.getManifest();
    @$el.find('.settings-about-name').html manifest.name
    @$el.find('.settings-about-version').html "v#{manifest.version}"
    @$el.find('.settings-about-rate').get(0).href = "https://chrome.google.com/webstore/detail/#{chrome.runtime.id}"
