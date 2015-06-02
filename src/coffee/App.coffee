class App
  constructor: ->
    @main()

  main: ->
    @settingsStorage = new SettingsStorage()
    document.addEventListener 'DOMContentLoaded', @ready.bind(this)

  ready: ->
    @settingsStorage.load().then ->
      app.init()
    , ->
      # no setting were loaded
      # do intro here
      app.init()
      app.generateDefaultSettings()

  generateDefaultSettings: -> return

  init: ->
    @i18n = new I18n
    @clock = new Clock
    @dock = new Dock
    @settingsView = new SettingsView
    @appearanceView = new AppearanceView
    @weather = new Weather
    # not ready yet
    # @quotes = new Quotes

    @updateViews()
    @showViews()

  updateViews: ->
    data = this.settingsStorage.data

    @clock.update data
    @dock.update data
    @appearanceView.update data
    @settingsView.update data
    @weather.update data
    # @quotes.update data

  showViews: ->
    @clock.show()
    @dock.show()
