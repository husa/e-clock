class Weather
  config =
    mode: 'json'
    units: 'metric'
    cnt: '5'
    location:
      enableHighAccuracy: false
      timeout: 500
      maximumAge: 1000*60*60*6 # 6 hours

  constructor: ->
    @apikey = 'e35c4324fb7999ba5788fbba8c901d11'
    @getUrl()
      .then(@getWeather)
      .then(JSON.parse)
      .then(@displayWeather.bind(this))
      .catch (err) ->
        console.log err

  update: (data) ->

  getUrl: ->
    @getLocation().then (location) =>
      # do some error handling
      lat = location.coords.latitude.toFixed 2
      lon = location.coords.longitude.toFixed 2
      "http://api.openweathermap.org/data/2.5/forecast/daily?&mode=#{config.mode}&units=#{config.units}&cnt=#{config.cnt}&lat=#{lat}&lon=#{lon}&APPID=#{@apikey}"

  getLocation: ->
    new Promise (resolve, reject)->
      navigator.geolocation.getCurrentPosition resolve, reject, config.location

  getWeather: (url) ->
    new Promise (resolve, reject) ->
      req = new XMLHttpRequest
      req.open 'GET', url, true
      req.onreadystatechange = (data) ->
        if req.readyState is 4
          if req.status is 200 then resolve req.responseText else reject(req)
      req.onerror = reject
      req.send()

  displayWeather: (data) ->
    @renderCity data.city
    @renderForecast data.list

  renderCity: (city) ->
    console.log "#{city.name}, #{city.country}"

  renderForecast: (days) ->
    console.log day for day in days
