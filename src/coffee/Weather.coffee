class Weather
  config =
    mode: 'json'
    units: 'internal'# get temp in kelvin
    cnt: '5'
    type: 'accurate'# like
    location:
      enableHighAccuracy: false
      timeout: 3000
      maximumAge: 1000 * 60 * 60 # 1 hour
    locationCacheAge: 30 * 60 * 1000
    weatherCacheAge: 30 * 60 * 1000

  constructor: ->
    @$el = $ '.weather'
    @apikey = 'e35c4324fb7999ba5788fbba8c901d11'

    @initialized = false
    @weatherData = {}

  update: (data) ->
    @data = data ? @data
    @processData()
    if not @initialized and data.displayWeather isnt off
      @loadData()
      return
    @updateWeather()

  loadData: ->
    @getLocation()
      .then thenable @cacheLocation
      .then @createUrlFromLocation
      .then @getWeather
      .then JSON.parse
      .then thenable @cacheWeather
      .then thenable @renderCity
      .then thenable @renderForecast
      .then thenable => @initialized = true
      .then @update.bind(this, null)
      .catch (err) =>
        log err
        @showError err

  createUrlFromLocation: (location) ->
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
          resolve location
        , reject, config.location

  cacheLocation: (location) ->
    localStorage.setItem 'locationCache', JSON.stringify location

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
            if req.status is 200 then resolve req.responseText else reject req
        req.onerror = reject
        req.send()

  cacheWeather: (data) =>
    @weatherData = data
    data.timestamp = +new Date
    localStorage.setItem 'weatherCache', JSON.stringify data

  renderCity: ({city}) =>
    @$el.find('.weather-city').html "#{city.name}, #{city.country}"

  renderForecast: ({list}) =>
    $forecast = @$el.find '.weather-forecast'
    $days = (@renderDay @getDayData day for day in list)
    $forecast.append day for day in $days

  getDayData: (day) ->
    min: @convertTemperature day.temp.min
    max: @convertTemperature day.temp.max
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
    @toggleWeather @data.displayWeather
    if @data.displayWeather
      @updateTemperatureUnits()
    @scaleForecast()

  scaleForecast: ->
    val = @data.fontSize * 0.075 + 0.125
    @$el.find('.weather-forecast').get(0).style.transform = "scale(#{val})"

  toggleWeather: (displayWeather = true) ->
    if displayWeather
      @$el.removeClass('hidden').addClass('show')
    else
      @$el.removeClass('show').addClass('hidden')

  showError: (err) ->
    @$el.find('.weather-error').removeClass('hidden').addClass('show').html chrome.i18n.getMessage 'i18nWeatherErrorMsg'

  processData: -> return

  updateTemperatureUnits: ->
    @updateDayTemp @getDayData(day), index for day, index in @weatherData.list

  updateDayTemp: (day, index) ->
    $node = $ $('.day-weather').get index + 1
    $node.find('.temperature-min').html "#{day.min}°"
    $node.find('.temperature-max').html "#{day.max}°"

  convertTemperature: (kelvin) ->
    deg = @data.temperatureUnits or 'c'
    Math.round if deg is 'c' then kelvin - 273.15 else kelvin * 9 / 5 - 459.67
