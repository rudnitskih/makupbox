class window.TripGuide
	config: 
		delay: -1
		tripTheme: "white"
		animation: "fadeIn"
		onEnd: ->
			e = document.createEvent('Event')
			e.initEvent('trip.ended', true, true)
			document.dispatchEvent e

	constructor: ->
		@trip = new Trip tripElements, @config

	start: ->
		@trip.start()

	next: ->
		@trip.next()

	index: ->
		@trip.tripIndex