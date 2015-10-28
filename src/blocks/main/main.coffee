class CanvasEditor
	constructor: (id) ->
		@id = id
		@reader = new FileReader()
		@imgObj = new Image()
		@f = fabric.Image.filters
		@cacheDom()
		@bindEvents()

	cacheDom: ->
		@mainWrapper = document.querySelector(".main__canvas")
		@inputImage = document.querySelector(".main__input")
		@ogTags = document.querySelectorAll("meta[name='twitter:image'], meta[itemprop='image'], meta[property='og:image']")

	initFabric: ->
		@mainWrapper.classList.add 'active'
		@canvas = new fabric.Canvas @id
		@f = fabric.Image.filters
		@upperCanvas = @mainWrapper.querySelector ".upper-canvas"
		@canvas.on "after:render", debounce @setOGTags.bind(@), 200

	bindEvents: ->
		window.addEventListener "saveImage", @saveImage.bind(@)
		@inputImage.addEventListener "change", @fileAdded.bind(@)
		@reader.addEventListener "load", (e) =>
			@imgObj.src = e.target.result
		@imgObj.addEventListener "load", @imageLoaded.bind(@)

		
	setSizes: ->
		return unless @canvas
		@canvas.setHeight @mainWrapper.clientHeight
		@canvas.setWidth @mainWrapper.clientWidth
		@canvas.renderAll()
		if @originalImg
			@setImageSize()

	setImageSize: ->
		if @originalImg
			cWidth = @canvas.width
			cHeight = @canvas.height
			iWidth = @oImgSizes.width
			iHeight = @oImgSizes.height
			if iWidth > cWidth or iHeight > cHeight
				@oImgSizes.scale = Math.max( iWidth / cWidth, iHeight / cHeight )

			@originalImg.set
				width: iWidth / @oImgSizes.scale
				height: iHeight / @oImgSizes.scale

			@setCenter @originalImg

	fileAdded: (e) ->
		@initFabric()
		@reader.readAsDataURL(e.target.files[0])

	imageLoaded: (e) ->
		@originalImg = new fabric.Image(@imgObj)
		@lockModification @originalImg
		@saveImageSizes()
		@setSizes()
		@canvas.add @originalImg

	saveImage: ->
		return unless @canvas
		if fabric.Canvas.supports('toDataURL')
			window.open canvas2img()
		else
			alert "Sorry but you browser not support saving image from canvas"

	setOGTags: ->
		if fabric.Canvas.supports('toDataURL') and @ogTags

			[].forEach.call @ogTags, (item) =>
				item.content = @canvas2img()

	canvas2img: -> 
		@canvas.toDataURL("image/jpeg")

	addEffect: (image) ->
		return unless @canvas
		fabric.Image.fromURL image, (oImg) =>
			@setCenter oImg
			@canvas.add oImg
			@canvas.setActiveObject oImg

	setCenter: (el) ->
		cWidth = @canvas.width
		cHeight = @canvas.height
		el.set
			originX: 'center'
			originY: 'center'
			top: cHeight / 2
			left: cWidth / 2

	applyFilter: (filterString, num) ->
		@canvas.getObjects().map (obj, i) =>
			return if i is 0
			filterFunc = new Function('f', filterString)
			filterRes = filterFunc(@f)
			obj.filters[num] = filterRes
			obj.applyFilters(@canvas.renderAll.bind(@canvas))
	
	resizeHandler: ->
		@setSizes()

	lockModification: (el) ->
		el.set
			lockMovementX: true
			lockMovementY: true
			lockUniScaling: true
			lockRotation: true
			hasControls: false
			hasBorders: false
			hasRotatingPoint: false
			selectable: false

	saveImageSizes: ->
		@oImgSizes =
			width: @originalImg.width
			height: @originalImg.height
			scale: 1

document.addEventListener "DOMContentLoaded", ->
	setTimeout =>
		window.CanvasEditor = new CanvasEditor( "photo-editor" )
	, 0