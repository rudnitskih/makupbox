window.closest = (el, fn) ->
	el and (if fn(el) then el else closest(el.parentNode, fn))

( ->
	ua = window.navigator.userAgent
	msie = ua.indexOf "MSIE "
	window.isIE = msie > 0
)()
window.debounce = debounce = (fn, delay) ->
	timer = null
	->
		context = this
		args = arguments
		clearTimeout timer
		timer = setTimeout(->
			fn.apply context, args
		, delay)

window.throttle = throttle = (fn, threshhold, scope) ->
	threshhold or (threshhold = 250)
	last = undefined
	deferTimer = undefined
	->
		context = scope or this
		now = +new Date
		args = arguments
		if last and now < last + threshhold
			
			# hold on to it
			clearTimeout deferTimer
			deferTimer = setTimeout(->
				last = now
				fn.apply context, args
			, threshhold)
		else
			last = now
			fn.apply context, args




