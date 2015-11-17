class window.TripGuide
	elements: [
		{
			sel : $('.main__inner'),
			content : '1. Choose image'
			position : "n"
		}, 
		{
			sel : $('.main__zoom-item:nth-child(2)')
			content : '2. Adjust it'
			position : "s"
		},
		{
			sel : $('.footer'),
			content : '3. Choose category'
			position : "n"
		}, 
		{
			sel : $('.footer'),
			content : '4. Add effect'
			position : "n"
		},
		{
			sel : ".main__tour-helper"
			content : '5. Adjust size'
			position : "s"
		},
		{
			sel : ".main__tour-helper"
			content : '6. Rotate'
			position : "n"
		},
		{
			sel : ".main__tour-helper"
			content : '6.5 Drag it'
			position : "s"
		},
		{
			sel : $('.main__zoom-item:nth-child(3)'),
			content : '7. Or delete'
			position : "s"
			delay: 6000
		}
		{
			sel : $('.header__save'),
			content : '8. Save it'
			position : "s"
			delay: 6000
		},
		{
			sel : $('.header__logo-text'),
			content : '9. Or add new one'
			position : "s"
			delay: 6000
		},

	]
	config: 
		delay: -1
		tripTheme: "white"
		animation: "fadeIn"
		onEnd: ->
			e = document.createEvent('Event')
			e.initEvent('trip.ended', true, true)
			document.dispatchEvent e

	constructor: ->
		@trip = new Trip @elements, @config

	start: ->
		@trip.start()

	next: ->
		@trip.next()

	index: ->
		@trip.tripIndex

	pause: ->
		console.log @trip.stop
		@trip.stop()