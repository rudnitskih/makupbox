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

		itemCat = closest e.target, (el) =>
			@hasClass el, "footer__item_cat"
		itemBack = closest e.target, (el) =>
			@hasClass el, 'footer__item_back'
		itemEffect = closest e.target, (el) =>
			@hasClass el, 'footer__item_effect'

		switch
			when itemCat then @itemCatClick itemCat
			when itemEffect then @itemEffectClick itemEffect
			when itemBack then @itemBackClick()

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

	itemEffectClick: (effect) ->
		effectImage = effect.querySelector(".footer__effect-img").dataset.image
		CanvasEditor.addEffect effectImage

	itemBackClick: ->
		for key, item of @catEffectsRendered
			item.classList.remove "active"
		@catItems.classList.add "active"

	hasClass: (el, className) ->
		el.classList && el.classList.contains className

document.addEventListener "DOMContentLoaded", ->
	new Footer "footer"