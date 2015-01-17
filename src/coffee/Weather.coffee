class Weather
  config =
    mode: 'json'
    units: 'metric'# imperial
    cnt: '5'
    type: 'accurate'# like
    location:
      enableHighAccuracy: false
      timeout: 500
      maximumAge: 1000 * 60 * 60 # 1 hour
    locationCacheAge: 30 * 60 * 1000
    weatherCacheAge: 30 * 60 * 1000

  constructor: ->
    @$el = $ '.weather'
    @apikey = 'e35c4324fb7999ba5788fbba8c901d11'

  update: (data) ->
    @data = data
    @processData()
    if not @initialized and data.displayWeather isnt off
      @loadData()
      return
    @updateWeather()

  loadData: ->
    @getUrl()
      .then @getWeather
      .then JSON.parse
      .then @cacheWeather
      .then @displayWeather.bind this
      .then => @initialized = true
      .then => @update @data
      .catch (err) ->
        log err

  getUrl: ->
    @getLocation().then (location) =>
      lat = location.coords.latitude.toFixed 5
      lon = location.coords.longitude.toFixed 5
      "http://api.openweathermap.org/data/2.5/forecast/daily?&mode=#{config.mode}&type=#{config.type}&units=#{config.units}&cnt=#{config.cnt}&lat=#{lat}&lon=#{lon}&APPID=#{@apikey}"

  getLocation: ->
    new Promise (resolve, reject) ->
      cache = JSON.parse localStorage.getItem 'locationCache'
      if cache and cache.timestamp > (+new Date - config.locationCacheAge)
        log 'got location from cache', cache
        resolve cache
      else
        navigator.geolocation.getCurrentPosition (location) ->
          log 'got location', location
          localStorage.setItem 'locationCache', JSON.stringify location
          resolve location
        , reject, config.location

  getWeather: (url) ->
    new Promise (resolve, reject) ->
      cache = localStorage.getItem 'weatherCache'
      parsedCache = JSON.parse cache
      if parsedCache and parsedCache.timestamp > (+new Date - config.weatherCacheAge)
        log 'got weather from cache', cache
        resolve cache
      else
        req = new XMLHttpRequest
        req.open 'GET', url, true
        req.onreadystatechange = (data) ->
          if req.readyState is 4
            log 'got weather', req.responseText
            if req.status is 200 then resolve req.responseText else reject(req)
        req.onerror = reject
        req.send()

  cacheWeather: (data) ->
    data.timestamp = +new Date
    localStorage.setItem 'weatherCache', JSON.stringify data
    data

  displayWeather: (data) ->
    setTimeout =>
      @renderCity data.city
      @renderForecast data.list
    , 0

  renderCity: (city) ->
    @$el.find('.weather-city').html "#{city.name}, #{city.country}"

  renderForecast: (days) ->
    $forecast = @$el.find '.weather-forecast'
    $days = (@renderDay @getDayData day for day in days)
    $forecast.append day for day in $days

  getDayData: (day) ->
    min: Math.round day.temp.min
    max: Math.round day.temp.max
    icon: day.weather[0].icon.match(/\d+/)[0]
    text: day.weather[0].main
    description: day.weather[0].description

  renderDay: (day) ->
    $node = $ @$el.find('#weather-template').get(0).content
    $node.find('.day-weather').get(0).setAttribute 'title', chrome.i18n.getMessage "i18nWeather#{day.icon}"
    $node.find('use').get(0).setAttributeNS 'http://www.w3.org/1999/xlink', 'href', "#weather-#{day.icon}"
    $node.find('.temperature-min').html "#{day.min}°"
    $node.find('.temperature-max').html "#{day.max}°"
    document.importNode $node.get(0), true

  updateWeather: ->
    @toggleWeather data.displayWeather
    @scaleForecast()

  scaleForecast: ->
    val = @data.fontSize * 0.075 + 0.125
    @$el.find('.weather-forecast').get(0).style.transform = "scale(#{val})"

  toggleWeather: (displayWeather = true) ->
    if displayWeather
      @$el.removeClass('hidden').addClass('show')
    else
      @$el.removeClass('show').addClass('hidden')

  processData: ->
    config.units = if @data.temperatureScale is 'f' then 'imperial' else 'metric'
