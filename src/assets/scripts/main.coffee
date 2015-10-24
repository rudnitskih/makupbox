window.closest = (el, fn) ->
	el and (if fn(el) then el else closest(el.parentNode, fn))



