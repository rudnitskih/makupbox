class CanvasEditor
	constructor: (id) ->
		@id = id
		@reader = new FileReader()
		@imgObj = new Image()
		@f = fabric.Image.filters
		@cacheDom()
		@bindEvents()
		@configFabricCtrl()

	cacheDom: ->
		@main = document.querySelector(".main")
		@mainWrapper = document.querySelector(".main__canvas")
		@watermarkImg = @mainWrapper.dataset.watermark
		@inputImage = document.querySelector(".main__input")
		@ogTags = document.querySelectorAll("meta[name='twitter:image'], meta[itemprop='image'], meta[property='og:image']")
		@zoomItem = document.querySelectorAll(".main__zoom-item")

	initFabric: ->
		@mainWrapper.classList.add 'active'
		@canvas = new fabric.Canvas @id
		@canvas.setHeight(@oImgSizes.height)
		@canvas.setWidth(@oImgSizes.width)
		@f = fabric.Image.filters
		@upperCanvas = @mainWrapper.querySelector ".upper-canvas"
		# console.log 
		# @canvas.set 
		# @updFabricCtrl()
		# interact('.draggable').draggable(
		# 	manualStart: true
		# )
		@cont = @mainWrapper.querySelector ".canvas-container"

		@draggie = new Draggabilly( ".canvas-container", {} )
		# @configFabricCtrl()
		# @canvas.on "mouse:down", @mouseDown.bind(@)
		# @canvas.on "mouse:up", @mouseUp.bind(@)
		@cont.classList.add "moving"

		
		@canvas.on "object:selected", =>
			@draggie.disable()
			@cont.classList.remove "moving"
		# 	footer.setActiveRemoveBtn()
		@canvas.on "selection:cleared", =>
			@draggie.enable()
			@cont.classList.add "moving"

			# footer.removeActiveRemoveBtn()
			
		# @canvas.on "after:render", debounce @setOGTags.bind(@), 2000

	bindEvents: ->
		@inputImage.addEventListener "change", @fileAdded.bind(@)
		@reader.addEventListener "load", (e) =>
			e ?= window.event
			@imgObj.src = e.target.result
		@imgObj.addEventListener "load", @imageLoaded.bind(@)
		[].forEach.call @zoomItem, (item) =>
			item.addEventListener "click", @zoomItemClickHandler.bind(@)
		document.addEventListener "keydown", (e) ->
			e ?= e || window.event
			@removeActive() if e.keyCode is 46
		
	setSizes: ->
		return unless @canvas
		@canvas.setHeight @mainWrapper.clientHeight - 2
		@canvas.setWidth @mainWrapper.clientWidth - 2
		@canvas.renderAll()
		if @originalImg
			@setImageSize()
			@canvas.setHeight(@originalImg.height)
			@canvas.setWidth(@originalImg.width)
			@centerCanvas()

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

	mouseDown: ->
		@selectAll()
	mouseUp: ->
		@unSelect()

	centerCanvas: ->
		@canvas.wrapperEl.style.marginLeft = - @canvas.width / 2 + "px"
		@canvas.wrapperEl.style.marginTop = - @canvas.height / 2 + "px"

	fileAdded: (e) ->
		e ?= window.event
		@reader.readAsDataURL(e.target.files[0])
		@main.classList.add "image-added"

	imageLoaded: ->
		@originalImg = new fabric.Image(@imgObj)
		@saveImageSizes()
		@originalImg.selectable = false
		@originalImg.hasBorders = false
		@originalImg.hasControls = false
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
			oImg.set "globalCompositeOperation", "screen"
			# configFabricCtrl
			# oImg.filters[4] = new @f.Blend({image: @originalImg, mode: 'screen'}) 
			@canvas.add oImg
			@canvas.setActiveObject oImg
			oImg.applyFilters(@canvas.renderAll.bind(@canvas))
		# @selectAll()

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
				hasBorders: false
				hasControls: false
				width: 50
				height: 50
			@canvas.add img

	zoomItemClickHandler: (e) ->
		e ?= window.event
		scale = .1
		if e.target.classList.contains "main__zoom-item_plus"
			@zoomIt(1 + scale)
		if e.target.classList.contains "main__zoom-item_minus"
			@zoomIt(1 - scale)
		if e.target.classList.contains "main__zoom-item_remove"
			@removeActive()

	zoomIt: (factor) ->
		@canvas.setHeight @canvas.getHeight() * factor
		@canvas.setWidth @canvas.getWidth() * factor
		if @canvas.backgroundImage
			# Need to scale background images as well
			bi = @canvas.backgroundImage
			bi.width = bi.width * factor
			bi.height = bi.height * factor
		objects = @canvas.getObjects()
		for i of objects
			scaleX = objects[i].scaleX
			scaleY = objects[i].scaleY
			left = objects[i].left
			top = objects[i].top
			tempScaleX = scaleX * factor
			tempScaleY = scaleY * factor
			tempLeft = left * factor
			tempTop = top * factor
			objects[i].scaleX = tempScaleX
			objects[i].scaleY = tempScaleY
			objects[i].left = tempLeft
			objects[i].top = tempTop
			objects[i].setCoords()
		@canvas.renderAll()
		@canvas.calcOffset()
		@centerCanvas()

	configFabricCtrl: (obj)->
		fabric.Object.prototype.setControlsVisibility
			mt: false
			mb: false
			ml: false
			mr: false
			tl: false
			tr: false
			bl: false

		fabric.Object::transparentCorners = false
		fabric.Object::borderColor = "#161616"
		fabric.Object::cornerColor = "#161616"
		

		# _original = fabric.Object::_drawControl
		# fabric.Object::_drawControl = (control, ctx, methodName, left, top) ->
			# size = @cornerSize = 15
			# if @canvas.hasControlCallback and @canvas.hasControlCallback[control]
				# @canvas.controlCallback[control] ctx, left, top, size
			# else
				# _original.call this, control, ctx, methodName, left, top

	updFabricCtrl: ->
		@canvas.hasControlCallback =
			mtr: true
		@canvas.controlCallback = 
			mtr: (ctx, left, top, size) ->
				image = new Image(30, 30)
				image.src = 'assets/i/rotate.svg'
				x = left - (image.width / 2) + size / 2
				y = top - (image.height / 2) + size / 2
				ctx.drawImage image, x, y, 30, 30

	removeActive: ->
		obj = @canvas.getActiveObject()
		obj.remove() if obj

	selectAll: ->
		objs = @canvas.getObjects().map((o) ->
			o.set 'active', true
		)
		@group = new fabric.Group(objs)
		@group.set
			hasControls: false
			hasBorders: false
			originX: 'center'
			originY: 'center'
		@canvas._activeObject = null
		@canvas.setActiveGroup(@group.setCoords()).renderAll()

	unSelect: ->
		items = @group._objects
		@group._restoreObjectsState()
		@canvas.remove(@group)
		i = 0
		while i < items.length
			@canvas.add items[i]
			i++
		@canvas.renderAll()

document.addEventListener "DOMContentLoaded", ->
	setTimeout =>
		window.CanvasEditor = new CanvasEditor( "photo-editor" )
	, 0