import colors from './colors'
import axios from 'axios'

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

function getBase64(url) {
    return axios
        .get(url, {
            responseType: 'arraybuffer'
        })
        .then(response => Buffer.from(response.data, 'binary').toString('base64'))
}

export {
	colors,
	_artistTypeHelper,
	topicSlugCutter,
	getBase64
}