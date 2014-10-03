class AppearanceView
  constructor: ->
    @$body = document.body
    @color = ''
    @bgColor  = ''
    @bgGradient = ''

  update: (data) ->
    @updateColor(data.color)
    @updateBackgroundColor(data.backgroundColor, data.backgroundPriority)
    @updateBackgroundGradient(data.backgroundGradient, data.backgroundGradientAngle, data.backgroundPriority)

  updateColor: (color) ->
    return if not color or color is @color
    @color = @$body.style.color = @$body.style.fill = color

  updateBackgroundColor: (color, priority) ->
    return if not color or priority isnt 'color'
    @bgColor = @$body.style.background = color

  updateBackgroundGradient: (colors, angle = '90deg', priority) ->
    return if not colors or priority isnt 'gradient'
    @bgGradient = colors
    colors = colors.split ','
    @$body.style.background = "linear-gradient(#{angle}, #{colors[0]} 10%, #{colors[1]} 90%)"
