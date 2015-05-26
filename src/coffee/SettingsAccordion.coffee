class SettingsAccordion

  constructor: ->
    @$accordion = $ '.accordion'
    @render()

  render: ->
    @$accordion.find('.accordion-label').on 'click', ->
      $(this).parent().toggleClass 'open'
