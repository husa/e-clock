class Quotes
  config =
    url: 'http://api.icndb.com/jokes/random'
    args: ''

  constructor: ->
    @initialized = no
    @$quote = $ '.quote-container'

  update: (data)->
    if not data.showQuote and false
      @hideQuote()
      return
    return if @initialized
    @loadQuote()
      .then JSON.parse
      .then @renderQuote.bind this
      .then @showQuote.bind this
      .then => @initialized = yes

  loadQuote: ->
    new Promise (resolve, reject) ->
      req = new XMLHttpRequest
      req.open 'GET', config.url, true
      req.onreadystatechange = ->
        if req.readyState is 4
          if req.status is 200 then resolve req.responseText else reject(req)
      req.onerror = reject
      req.send()

  renderQuote: (data) ->
    console.log data
    @$quote.html data?.value?.joke
    return data

  showQuote: ->
    @$quote.removeClass 'hidden'

  hideQuote: ->
    @$quote.addClass 'hidden'



