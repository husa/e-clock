class SettingsStorage
  constructor: ->
    self = this
    @key = 'settings_data'
    @data = {}

    @loaded = new Promise (resolve, reject) ->
      fulfilled = no
      chrome.storage.sync.get self.key, (data) ->
        return if fulfilled
        fulfilled = yes
        if not data or isEmpty(data) or not data[self.key]
          reject()
        else
          self.data = data[self.key]
          resolve()
      setTimeout ->
        return if fulfilled
        self.data = (JSON.parse localStorage.getItem self.key) ? {}
        fulfilled = yes
        console.log 'data restored from localStorage'
        resolve()
      , 200

  sync: ->
    storeData = {}
    storeData[@key] = @data
    chrome.storage.sync.set storeData
    localStorage.setItem @key, JSON.stringify @data

  update: (key, value, options) ->
    @data[key] = value
    @sync() unless options?.dontSync
    app.updateViews() unless options?.silent
