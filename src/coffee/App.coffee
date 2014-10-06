class App
  constructor: ->
    @main()

  main: ->
    @settingsStorage = new SettingsStorage()
    document.addEventListener 'DOMContentLoaded', @ready.bind(this)

  ready: ->
    @settingsStorage.loaded.then ->
        app.init()
      , ->
        # no setting were loaded
        # do intro here
        app.init()
        app.generateDefaultSettings()

  generateDefaultSettings: -> return

  init: ->
    @i18n = new I18n()
    @clock = new Clock()
    @dock = new Dock()
    @settingsView = new SettingsView()
    @appearanceView = new AppearanceView()

    @updateViews()
    @showViews()

  updateViews: ->
    data = this.settingsStorage.data;

    @clock.update(data);
    @dock.update(data)
    @appearanceView.update(data)
    @settingsView.update(data)

  showViews: ->
    @clock.show()
    @dock.show()
