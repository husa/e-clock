class SettingsStorage
  constructor: ->
    self = this
    @key = "settings_data"
    @data = {}

    @loaded = new Promise (resolve, reject) ->
      chrome.storage.sync.get self.key, (data) ->
        if not data or isEmpty(data) or not data[self.key]
          reject()
        else
          self.data = data[self.key]
          resolve()

  sync: ->
    storeData = {}
    storeData[@key] = @data
    chrome.storage.sync.set storeData

  update: (key, value, options) ->
    @data[key] = value
    @sync() unless options?.dontSync
    app.updateViews() unless options?.silent
