class Footer
	catEffectsRendered: {}
	constructor: (blockName) ->
		@blockName = blockName
		@block = document.querySelector ".#{@blockName}"
		return unless @block
		@cacheDom()
		@bindEvents()

	cacheDom: ->
		@catItems = @block.querySelector ".footer__list"

	bindEvents: ->
		@block.addEventListener "click", @blockClickHandler.bind(@)

	blockClickHandler: (e) ->
		e ?= window.event
		itemCat = closest e.target, (el) =>
			@hasClass el, "footer__item_cat"
		itemBack = closest e.target, (el) =>
			@hasClass el, 'footer__item_back'
		itemEffect = closest e.target, (el) =>
			@hasClass el, 'footer__item_effect'
		itemRemove = closest e.target, (el) =>
			@hasClass el, 'footer__item_remove'

		switch
			when itemCat then @itemCatClick itemCat
			when itemEffect then @itemEffectClick itemEffect
			when itemBack then @itemBackClick()
			when itemRemove then @itemRemoveClick()


	itemCatClick: (cat) ->
		effects = cat.querySelector "[type='template']"
		return unless effects
		effectCatName = effects.getAttribute "name"

		unless @catEffectsRendered[ effectCatName ]
			effectsWrapper = document.createElement "ul"
			effectsWrapper.className = "footer__list footer__list_effects #{effectCatName}"
			effectsWrapper.innerHTML = """
				<li class="footer__item footer__item_back"></li>
				#{effects.innerHTML}
			"""
			@block.appendChild effectsWrapper
			@catEffectsRendered[ effectCatName ] = effectsWrapper

		@catItems.classList.remove "active"
		@catEffectsRendered[ effectCatName ].classList.add "active"
		CanvasEditor.nextStep(3)

	itemEffectClick: (effect) ->
		effectData = effect.querySelector(".footer__effect-img").dataset
		effectImage = if CanvasEditor.blendingSupport then effectData.image else effectData.fallbackImage
		CanvasEditor.addEffect effectImage
		CanvasEditor.nextStep(4)

	itemBackClick: ->
		for key, item of @catEffectsRendered
			item.classList.remove "active"
		@catItems.classList.add "active"
	
	hasClass: (el, className) ->
		el.classList && el.classList.contains className

	# setActiveRemoveBtn: ->
	# 	@block.querySelector(".footer__list.active .footer__item_remove").classList.add "active"

	# removeActiveRemoveBtn: ->
	# 	@block.querySelector(".footer__list.active .footer__item_remove").classList.remove "active"

document.addEventListener "DOMContentLoaded", ->
	window.footer = new Footer "footer"