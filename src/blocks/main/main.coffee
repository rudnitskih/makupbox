class CanvasEditor
	constructor: (id) ->
		@id = id
		@reader = new FileReader()
		@imgObj = new Image()
		@f = fabric.Image.filters
		@cacheDom()
		@bindEvents()

	cacheDom: ->
		@main = document.querySelector(".main")
		@mainWrapper = document.querySelector(".main__canvas")
		@watermarkImg = @mainWrapper.dataset.watermark
		@inputImage = document.querySelector(".main__input")
		@ogTags = document.querySelectorAll("meta[name='twitter:image'], meta[itemprop='image'], meta[property='og:image']")

	initFabric: ->
		@mainWrapper.classList.add 'active'
		@canvas = new fabric.Canvas @id
		@canvas.setHeight(@oImgSizes.height)
		@canvas.setWidth(@oImgSizes.width)
		@f = fabric.Image.filters
		@upperCanvas = @mainWrapper.querySelector ".upper-canvas"
		# @canvas.on "after:render", debounce @setOGTags.bind(@), 2000

	bindEvents: ->
		@inputImage.addEventListener "change", @fileAdded.bind(@)
		@reader.addEventListener "load", (e) =>
			e ?= window.event
			@imgObj.src = e.target.result
		@imgObj.addEventListener "load", @imageLoaded.bind(@)
		
	setSizes: ->
		return unless @canvas
		@canvas.setHeight @mainWrapper.clientHeight - 2
		@canvas.setWidth @mainWrapper.clientWidth - 2
		@canvas.renderAll()
		if @originalImg
			@setImageSize()
			@canvas.setHeight(@originalImg.height)
			@canvas.setWidth(@originalImg.width)

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

	fileAdded: (e) ->
		e ?= window.event
		@reader.readAsDataURL(e.target.files[0])
		@main.classList.add "image-added"

	imageLoaded: ->
		@originalImg = new fabric.Image(@imgObj)
		@saveImageSizes()
		@originalImg.selectable = false
		@initFabric()
		@setSizes()
		@canvas.add @originalImg
		@addWatermark()

	saveImage: ->
		return unless @canvas
		if fabric.Canvas.supports('toDataURL')
			img = @canvas2img()
			win = window.open()
			win.document.body.innerHTML = "<img src='" + img + "'></img>"
			win.document.close()			
		else
			alert "Sorry but you browser not support saving image from canvas"

	setOGTags: ->
		if fabric.Canvas.supports('toDataURL') and @ogTags
			base64 = @canvas2img()
			[].forEach.call @ogTags, (item) =>
				item.content = base64

	canvas2img: -> 
		@canvas.toDataURL("image/jpeg;base64;")

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

	saveImageSizes: ->
		@oImgSizes =
			width: @originalImg.width
			height: @originalImg.height
			scale: 1

	addWatermark: ->
		fabric.Image.fromURL @watermarkImg, (img) =>
			img.selectable = false
			img.set
				originX: 'center'
				originY: 'center'
				left: @canvas.width - 50
				top: @canvas.height - 50
				width: 50
				height: 50
			@canvas.add img

document.addEventListener "DOMContentLoaded", ->
	setTimeout =>
		window.CanvasEditor = new CanvasEditor( "photo-editor" )
	, 0