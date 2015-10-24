class Header
	constructor: (blockName) ->
		@blockName = blockName
		@block = document.querySelector ".#{@blockName}"
		return unless @block
		@cacheDom()
		@bindEvents()

	cacheDom: ->
		@saveBtn = @block.querySelector ".header__save"
		@filtres = @block.querySelector ".header__filters"

	bindEvents: ->
		@saveBtn.addEventListener "click", ->
			CanvasEditor.saveImage()
		@filtres.addEventListener "click", (e) ->
			CanvasEditor.applyFilter()

document.addEventListener "DOMContentLoaded", ->
	new Header "header"