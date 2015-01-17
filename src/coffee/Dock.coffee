class Dock
  constructor: ->
    @$dock = $ '.dock'
    @$icons = @$dock.find '.dockicon'
    @iconViews = (new DockIcon($icon, this) for $icon in @$icons.get())

  getSettings: ->
    if not @$settingsContainer
      @$settingsContainer = $ document.createElement 'div'
      @$settingsContainer.append(iconView.generateSetting()) for iconView in @iconViews.reverse() when not iconView.isSettingsIcon
    @$settingsContainer

  update: (data) ->
    iconView.update(data[iconView.url]) for iconView in @iconViews

  toggleAutoHide: (turnOn) -> @$dock.toggleClass 'auto-hide', turnOn

  show: -> @$dock.removeClass 'initiallyHidden'
