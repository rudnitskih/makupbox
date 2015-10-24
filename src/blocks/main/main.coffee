class CanvasEditor
	constructor: (id) ->
		@id = id
		@reader = new FileReader()
		@imgObj = new Image()
		@cacheDom()
		@bindEvents()

	cacheDom: ->
		@mainWrapper = document.querySelector(".main__canvas")
		@inputImage = document.querySelector(".main__input")
	initFabric: ->
		@mainWrapper.classList.add 'active'
		@canvas = new fabric.Canvas @id
		@f = fabric.Image.filters
		@upperCanvas = @mainWrapper.querySelector ".upper-canvas"

	bindEvents: ->
		window.addEventListener "resize", @resizeHandler.bind(@)
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
			iWidth = @originalImg.width
			iHeight = @originalImg.height
			scale = 1

			# console.log cWidth, cHeight, iWidth, iHeight
			if iWidth > cWidth or iHeight > iHeight
				scaleX = iWidth / cWidth
				scaleY = iHeight / cHeight
				scale = Math.max( scaleY, scaleX )
				# console.log scaleX,  scaleY
			@originalImg.set
				width: iWidth / scale
				height: iHeight / scale

			@setCenter @originalImg
			# @canvas.renderAll()

	fileAdded: (e) ->
		@initFabric()
		@reader.readAsDataURL(e.target.files[0])

	imageLoaded: (e) ->
		@originalImg = new fabric.Image(@imgObj)
		@lockModification @originalImg
		@setSizes()
		@canvas.add @originalImg

	saveImage: ->
		return unless @canvas
		if fabric.Canvas.supports('toDataURL')
			window.open @canvas.toDataURL('jpg')
		else
			alert "Sorry but you browser not support saving image from canvas"

	addEffect: (image) ->
		return unless @canvas
		# unless @canvas
		# 	@initFabric()
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

	applyFilter: (index, filter) ->
		obj = @canvas.getActiveObject()
		return unless obj
		obj.filters[0] = new @f.Grayscale()
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

document.addEventListener "DOMContentLoaded", ->
	setTimeout =>
		window.CanvasEditor = new CanvasEditor( "photo-editor" )
	, 0