class SettingsStorage

  config =
    chromeStorageTimeout: 200

  constructor: ->
    @key = 'settings_data'
    @data = {}

  load: ->
    self = this
    Promise.race [
      new Promise (resolve, reject) ->
        chrome.storage.sync.get self.key, (data) ->
          if not data or isEmpty(data) or not data[self.key]
            reject()
          else
            resolve data[self.key]
      new Promise (resolve, reject) ->
        setTimeout ->
          resolve (JSON.parse localStorage.getItem self.key) ? {}
        , config.chromeStorageTimeout
    ]
    .then thenable (data) ->
      self.data = data
    .then thenable @cacheData

  sync: ->
    storeData = {}
    storeData[@key] = @data
    chrome.storage.sync.set storeData
    @cacheData()

  update: (key, value, options) ->
    @data[key] = value
    @sync() unless options?.dontSync
    app.updateViews() unless options?.silent

  cacheData: (data) ->
    data ?= @data
    localStorage.setItem @key, JSON.stringify data
