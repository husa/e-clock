class AppearanceView
  constructor: ->
    @$body = document.body
    @color = ''
    @bgColor  = ''
    @bgGradient = ''
    @bgPattern = ''

  update: (data) ->
    @updateColor data.color
    @updateBackgroundColor data.backgroundColor, data.backgroundPriority
    @updateBackgroundGradient data.backgroundGradient, data.backgroundGradientAngle, data.backgroundPriority
    @updateBackgroundPattern data.backgroundPattern, data.backgroundPriority

  updateColor: (color) ->
    return if not color or color is @color
    @color = @$body.style.color = @$body.style.fill = color

  updateBackgroundColor: (color, priority) ->
    return if not color or priority isnt 'color'
    @bgColor = @$body.style.background = color

  updateBackgroundPattern: (id, priority) ->
    return if not id or priority isnt 'pattern'
    @bgPattern = @$body.style.backgroundImage = "url('../../img/patterns/#{id}.png')"

  updateBackgroundGradient: (colors, angle = '90deg', priority) ->
    return if not colors or priority isnt 'gradient'
    @bgGradient = colors
    colors = colors.split ','
    @$body.style.background = "linear-gradient(#{angle}, #{colors[0]} 10%, #{colors[1]} 90%)"
