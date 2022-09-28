import colors from './colors'

function _artistTypeHelper() {
	return {
		"digital_artist": "Дижитал артист",
		"photographer": "Гэрэл зурагчин",
		"fine_artist": "Уран зураач"
	}
}

function topicSlugCutter(slug) {
	if(!slug) return ""
	return slug.split("geru.mn/topic/")[1]
}

export {
	colors,
	_artistTypeHelper,
	topicSlugCutter
}