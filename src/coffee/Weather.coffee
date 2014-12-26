class Weather
  config =
    mode: 'json'
    units: 'metric'# imperial
    cnt: '5'
    type: 'accurate'# like
    location:
      enableHighAccuracy: false
      timeout: 500
      maximumAge: 1000*60*60 # 1 hour

  constructor: ->
    @$el = $ '.weather'
    @apikey = 'e35c4324fb7999ba5788fbba8c901d11'

  update: (data) ->
    @data = data
    @processData()
    if not @initialized
      @loadData()
      return
    if data.displayWeather
      @$el.removeClass('hidden').addClass('show')
    else
      @$el.removeClass('show').addClass('hidden')

  loadData: () ->
    @getUrl()
      .then @getWeather
      .then JSON.parse
      .then @displayWeather.bind this
      .then => @initialized = true
      .then => @update @data
      .catch (err) ->
        console.log err

  getUrl: ->
    @getLocation().then (location) =>
      lat = location.coords.latitude.toFixed 2
      lon = location.coords.longitude.toFixed 2
      "http://api.openweathermap.org/data/2.5/forecast/daily?&mode=#{config.mode}&type=#{config.type}&units=#{config.units}&cnt=#{config.cnt}&lat=#{lat}&lon=#{lon}&APPID=#{@apikey}"

  getLocation: ->
    new Promise (resolve, reject) ->
      cache = JSON.parse localStorage.getItem 'locationCache'
      if cache and cache.timestamp > (+new Date - 30*60*1000)
        resolve cache
      else
        navigator.geolocation.getCurrentPosition (location) ->
          localStorage.setItem 'locationCache', JSON.stringify(location)
          resolve location
        , reject, config.location

  getWeather: (url) ->
    new Promise (resolve, reject) ->
      #do cashing here
      req = new XMLHttpRequest
      req.open 'GET', url, true
      req.onreadystatechange = (data) ->
        if req.readyState is 4
          if req.status is 200 then resolve req.responseText else reject(req)
      req.onerror = reject
      req.send()

  displayWeather: (data) ->
    setTimeout =>
      @renderCity data.city
      @renderForecast data.list
    , 0

  renderCity: (city) ->
    @$el.find('.weather-city').html "#{city.name}, #{city.country}"

  renderForecast: (days) ->
    days = (@getDayData day for day in days)
    $days = (@renderDay day for day in days)
    @$el.append day for day in $days

  getDayData: (day) ->
    min: Math.round day.temp.max
    max: Math.round day.temp.min
    icon: day.weather[0].icon.match(/\d+/)[0]
    text: day.weather[0].main
    description: day.weather[0].description

  renderDay: (day) ->
    $node = $ @$el.find('#weather-template').get(0).content
    $node.find('use').get(0).setAttributeNS 'http://www.w3.org/1999/xlink', 'href', "#weather-#{day.icon}"
    $node.find('.temperature').html "#{day.min}° #{day.max}°"
    document.importNode $node.get(0), true

  processData: ->
    config.units = if @data.temperatureScale is 'f' then 'imperial' else 'metric'
