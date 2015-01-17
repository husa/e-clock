class DockIcon
  constructor: ($el, parent) ->
    throw Error('specify $el') if not $el
    @$el = $ $el
    @parent = parent
    @url = @$el.data 'url'
    @isSettingsIcon = /^settings$/.test(@url)
    @handleClick()

  handleClick: ->
    self = this
    @$el.on 'mousedown', (e) ->
      return if not url = @dataset.url
      if self.isSettingsIcon
        app.settingsView.toggle()
      else
        if e.metaKey or e.ctrlKey or e.button is 1
          chrome.tabs.create
            url    : url,
            active : true
        else
          chrome.tabs.update
            url : url

  generateSetting: ->
    svgIcon = @$el.html()
    title = @$el.data 'alt'

    if not @$settingIcon
      @$settingIcon = $ document.createElement 'div'
      @$settingIcon.addClass 'settings-dock-icon', 'settings-item'
      checked = if @$el.hasClass 'hidden' then '' else 'checked'
      @$settingIcon.html "<input type=\"checkbox\" #{checked}/>#{svgIcon}<span>#{title}</span>"
      @$settingIcon.addClass if checked then 'enabled' else 'disabled'
      @handleSettings()
    return @$settingIcon

  handleSettings: ->
    throw Error 'setting weren\'t generated yet' if not @$settingIcon
    @$settingIcon.on 'mousedown', =>
      checked = not @$settingIcon.find('input').get(0).checked
      app.settingsStorage.update @url,
        visible : checked,
        order : null

  show: ->
    @$el.removeClass 'hidden'
    if @$settingIcon
      @$settingIcon.removeClass('disabled').addClass('enabled').
        find('input').get(0).checked = true

  hide: ->
    @$el.addClass 'hidden'
    if @$settingIcon
      @$settingIcon.removeClass('enabled').addClass('disabled').
        find('input').get(0).checked = false

  update: (data) ->
    if data and not data.visible then @hide() else @show()
