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
		@filtres.addEventListener "click", (e) =>
			filterFunction = e.target.dataset && e.target.dataset.filter
			num = @whichChild e.target
			CanvasEditor.applyFilter filterFunction, num

	whichChild: (elem) ->
		i = 0
		while((elem=elem.previousSibling)!=null) 
			++i
		return i


document.addEventListener "DOMContentLoaded", ->
	new Header "header"