# utility function, to find out if Object is empty
isEmpty = (o) -> return !Object.keys(o).length

debounce = (func, threshold, execAsap) ->
  timeout = null
  (args...) ->
    obj = this
    delayed = ->
      func.apply(obj, args) unless execAsap
      timeout = null
    if timeout
      clearTimeout(timeout)
    else if (execAsap)
      func.apply(obj, args)
    timeout = setTimeout delayed, threshold || 100

ripple = (target) ->
  target.addClass 'ripple'
  setTimeout ( -> target.removeClass 'ripple'), 200

persistentLog = ''
log = (args...) ->
  persistentLog += args.map(JSON.stringify).join '\n'
  console.log.apply console, args
window.getPersistentLog = -> persistentLog

