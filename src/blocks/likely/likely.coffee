document.addEventListener "DOMContentLoaded", ->
	likely = document.querySelector(".likely")
	if likely
		likely.addEventListener "click", (e) ->
			e.preventDefault()
			CanvasEditor.setOGTags()