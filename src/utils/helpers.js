import _ from 'lodash'
import moment from 'moment'
import axios from 'axios'
import * as THREE from "three";

const minPriceTemplate = 100000000
const S3_URL = 's3-eu-west-1.amazonaws.com/simplood.geruapp'
const S3_PREV_URL = 'simplood.geruapp.s3-website-eu-west-1.amazonaws.com'//config.S3_PREV_URL
const S3_PREFIX = "https://"

const image_sizes = {
	product: {
		small: 100,
		medium: 236,
		large: 564,
	},
	conversation: {
		small: 100,
		medium: 140, large: 260,
	},
}	

export function getBase64(url) {
    return axios
    .get(url, {
        responseType: 'arraybuffer'
    })
    .then(response => Buffer.from(response.data, 'binary').toString('base64'))
}

export function deg2rad(deg) {
  return deg * (Math.PI/180)
}

export function resizeImage(base64Str, maxWidth = 400, maxHeight = 350) {
	return new Promise((resolve) => {
	  let img = new Image()
	  img.src = base64Str
	  img.onload = () => {
		let canvas = document.createElement('canvas')
		const MAX_WIDTH = maxWidth
		const MAX_HEIGHT = maxHeight
		let width = img.width
		let height = img.height
  
		if (width > height) {
		  if (width > MAX_WIDTH) {
			height *= MAX_WIDTH / width
			width = MAX_WIDTH
		  }
		} else {
		  if (height > MAX_HEIGHT) {
			width *= MAX_HEIGHT / height
			height = MAX_HEIGHT
		  }
		}
		canvas.width = width
		canvas.height = height
		let ctx = canvas.getContext('2d')
		ctx.drawImage(img, 0, 0, width, height)
		resolve(canvas.toDataURL())
	  }
	})
}
  
export const convertImageToTextureCallback = (external_url, callback) => {
	if(!external_url) return null
  
	const textureLoader = new THREE.TextureLoader();
  
	getBase64(external_url)
	.then(base64 => {
		let texture = textureLoader.load(`data:image/jpeg;base64,${base64}`)
		texture.encoding = THREE.sRGBEncoding;
		texture.flipY = false;
		texture.repeat.x = 1;

		callback(texture)
	})
}

export const convertImageToTexture = async (external_url, is_base_64 = false) => {
	if(!external_url) return null
  
	const textureLoader = new THREE.TextureLoader();
  
	let base64 = null
	let ImageUri = ""//external_url// ""

	if(is_base_64) {
		base64 = external_url
		ImageUri = base64
	} else {
		base64 = await getBase64(external_url)
		ImageUri = `data:image/jpeg;base64,${base64}`
	}
  
	let texture = textureLoader.load(ImageUri)
  
	texture.encoding = THREE.sRGBEncoding;
	texture.flipY = false;
	texture.repeat.x = 1;
  
	return texture;
}

export function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
  lat1 = deg2rad(lat1);
  lat2 = deg2rad(lat2);
  lon1 = deg2rad(lon1);
  lon2 = deg2rad(lon2);
  var R = 6371; // km
  var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  var y = (lat2 - lat1);
  var d = Math.sqrt(x * x + y * y) * R;
  return d;
}

export function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return Math.abs(d);
} 

export function ignoreFields(object, fields = []) {
	let cloneObject = {}
	for (var property in object) {
	    if (object.hasOwnProperty(property)) {
	    	if(!_.includes(fields, property)) {
	    		cloneObject[property] = object[property]
	    	}
	        // do stuff
	    }
	}
	return cloneObject
}

export function collectFields(object, fields = []) {
	let cloneObject = {}
	for (var property in object) {
	    if (object.hasOwnProperty(property)) {
	    	if(_.includes(fields, property)) {
	    		cloneObject[property] = object[property]
	    	}
	        // do stuff
	    }
	}
	return cloneObject
}

export async function simulateApi(delay = 1000) {
  // simulate an asynchronous operation
  return new Promise((res) => setTimeout(res, delay))
    .then(() => Math.floor(Math.random() * 100));
}

export function simulateResponse(data) {
	return {
		res: {
			data: {
				...data
			}
		}
	}
}

export function imageSize(url, ratio = 1, type = 'product', size = 'small') {
	if(!url || (typeof url) != 'string') return

	var S3_MATCHING_URL = S3_URL
	if(!url.split(S3_URL)[1]) {
		if(!url.split(S3_PREV_URL)[1]) {
			return url
		}
		S3_MATCHING_URL = S3_PREV_URL
	}

	//console.log(S3_MATCHING_URL)

	//if()
	const imageUrl = url.split(S3_MATCHING_URL)[1]
	return String(S3_PREFIX + S3_URL + '/' + image_sizes[type][size] + 'x' + Math.ceil(image_sizes[type][size] * ratio) + imageUrl)
}

export function createAction(type, payload = {}) {
  return { type, payload }
}

export function* throwError(action, message, payload = {}, type = 'warning') {
	//toast.info(message)
	//toast("Default Notification !");
    // return yield put(createAction(action, payload))
}

export function nFormatter(num, digits = 2) {
	const lookup = [
	  { value: 1, symbol: "" },
	  { value: 1e3, symbol: "k" },
	  { value: 1e6, symbol: "M" },
	  { value: 1e9, symbol: "G" },
	  { value: 1e12, symbol: "T" },
	  { value: 1e15, symbol: "P" },
	  { value: 1e18, symbol: "E" }
	];
	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
	var item = lookup.slice().reverse().find(function(item) {
	  return num >= item.value;
	});
	return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

export function preloadImage (src) {
	return new Promise((resolve, reject) => {
	  const img = new Image()
	  img.onload = function() {
		resolve(img)
	  }
	  img.onerror = img.onabort = function() {
		reject(src)
	  }
	  img.src = src
	})
}

export function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

export function currencyFormat(price) {
	if(!price) return '0₮'

	return `${nFormatter(price)}₮`
  	//return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "₮";
}

export function currencyFormatN(price) {
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₮";
}

function _isNearDate(date) {
	return date.diff(moment(), 'days') < 3
}

export function humanDate(date) {
	//1. Same next next 2 ---- own name like -- Өнөөдөр, Маргааш, Нөгөөдөр
	//else 
	if(!moment.isMoment(date)) 
		date = moment(date)

	let prefix = date.format('dddd')

	if(_isNearDate(date)) {
		prefix = date.calendar(null, {
			sameDay: '[Өнөөдөр]',
			nextDay: '[Маргааш]',
			nextWeek: 'dddd',
			sameElse: 'MM сарын DD'
		})
	}
	
	return {
		prefix,
		date: date.format('MM/DD')
	}
}

export function _calculateStoreWorkingDuration(staffs_count, day, quantity) {
	return Math.ceil(day * (quantity >= staffs_count ? (quantity / staffs_count) : 1))
}

export function _calculateQuantityOfMakingNew(product, qty, lookup_id) {
	var quantityOfMakingNew = 0 

	if(_.isEmpty(product)) return quantityOfMakingNew

	let { 
		is_single_kind_of,
		quantity,
		variations,
		variations_lookup
	} = product

	if(is_single_kind_of) {
		if(quantity < qty) {
			quantityOfMakingNew = qty - quantity
		}
	} else {
		let has_different_quantity = false
		variations.forEach((variation) => {
			if(!has_different_quantity && variation.has_different_quantity) {
				has_different_quantity = true
			}
		})

		if(has_different_quantity && variations_lookup[lookup_id]) {
			if(variations_lookup[lookup_id].quantity < qty) {
				quantityOfMakingNew = qty - variations_lookup[lookup_id].quantity
			}
		} else {
			if(quantity < qty) {
				quantityOfMakingNew = qty - quantity
			}
		}
	}

	return quantityOfMakingNew
}

export function toNumber(text) {
	let zeroFixed = text[0] == "0" && text.length > 1 ? text.substring(1): text
	return zeroFixed.replace(/[^0-9]/g, '')
}

export function getProductQuantityStatus(variations) {
	let quantityStatus = {
		type: 'const', //it means just follow main price, //single //double
		variation_index: 0,
	}

	variations.forEach((variation, i) => {
		if(variation.has_different_quantity) {
			if(quantityStatus.type == 'const') {
				quantityStatus.type = 'single'
				quantityStatus.variation_index = i + 1
			} else {
				if(quantityStatus.type == 'single') {
					quantityStatus.type = 'double'
					quantityStatus.variation_index = 0
				}
			}
		}
    })

    return quantityStatus
}

export function getProductPhotoStatus(variations) {
	let photoStatus = {
		type: 'const', //it means just follow main price, //single //double
		variation_index: 0,
	}

	variations.forEach((variation, i) => {
		if(variation.has_different_photo) {
			if(photoStatus.type == 'const') {
				photoStatus.type = 'single'
				photoStatus.variation_index = i + 1
			} else {
				if(photoStatus.type == 'single') {
					photoStatus.type = 'double'
					photoStatus.variation_index = 0
				}
			}
		}
    })

    return photoStatus
}

export function getProductPriceStatus(variations) {
	let priceStatus = {
		type: 'const', //it means just follow main price, //single //double
		variation_index: 0,
	}

	variations.forEach((variation, i) => {
		if(variation.has_different_price) {
			if(priceStatus.type == 'const') {
				priceStatus.type = 'single'
				priceStatus.variation_index = i + 1
			} else {
				if(priceStatus.type == 'single') {
					priceStatus.type = 'double'
					priceStatus.variation_index = 0
				}
			}
		}
    })

    return priceStatus
}

export function _renderOrderTitle({ is_single_kind_of, sku, title, selected_variation }) {
	//if(title == 'Jkljldsaf') alert(sku + ' - ' + title + ' => ' + is_single_kind_of)
	let orderTitle = ""
	if(sku.trim()) orderTitle += '/' + sku

	if(!is_single_kind_of) {
		if(!_.isEmpty(selected_variation) && selected_variation.sku.trim()) {
			orderTitle += ('-' + selected_variation.sku + '/ - ')
		} else {
			if(sku.trim()) orderTitle += '/ - '	
		}
	} else {
		if(sku.trim()) orderTitle += '/ - '
	}

	orderTitle += title

	return orderTitle
}

export function _renderOrderPhoto(product, size = 'small') {
	if(product.is_single_kind_of) {
		return imageSize(product.cover.url, product.cover.ratio, 'product', size)
	}

	if(!_.isEmpty(product.selected_variation) && !_.isEmpty(product.selected_variation.photo)) {
		return product.selected_variation.photo.url
	}

	return imageSize(product.cover.url, product.cover.ratio, 'product', size)
}

export function _renderDiscountHelper(product, discount, quantity = 1) {
	let priceStatus = getProductPriceStatus(product.variations)
	const percentage = 100 - discount.discount_value

	if(priceStatus.type == 'const') {
	    return `${currencyFormat(Math.ceil((product.price * quantity) * percentage) / 100)}`
	}

	let minPrice = minPriceTemplate
	let prices = []
	const variations_lookup = product.variations_lookup

	for (var property in variations_lookup) {
	    if (variations_lookup.hasOwnProperty(property)) {
	        let price = variations_lookup[property].price

	        if(priceStatus.type == 'single' && !product.is_variations_mixed) {
	    		if(property[1] != priceStatus.variation_index) continue
	    	}
	    
	        prices.push(price)
	    }
	}

	prices.sort((a, b) => a - b)

	let tempMinPrice = prices[0]
	tempMinPrice = Math.ceil(((tempMinPrice) * percentage) / 100)
	let minPriceRange = `${currencyFormat(tempMinPrice)}`

	return (prices.every(function(value, _, array) { return array[0] == value }) ? '' : '+') + minPriceRange
}

export function getProductPrice(product, price) {
	let pricePerProduct = price
	const discount = getProductDiscount(product)
	if(discount) pricePerProduct = _applyPercentDiscount(pricePerProduct, discount)
	return pricePerProduct
}

export function getProductDiscount(product) {
	const discount = product.discounts ? product.discounts.find((cur) => {
		return moment().isBetween(moment(cur.begin_at), moment(cur.end_at))
		//return moment().isBefore(moment(cur.begin_at))
	}) : null

	return discount
}

export function _applyPercentDiscount(price, discount, quantity = 1) {
	const percentage = discount.discount_value
    //discount_price = (price * quantity * percentage) / 100
	return _applyPercentageDiscount(price, percentage)
}

export function _applyPercentageDiscount(price, percentage) {
	return Math.ceil((price * (100 - percentage)) / 100)
}

export function _applyDiscount(price, discount) {
	const percentage = discount.discount_value
	return `${currencyFormat(Math.ceil(price * 100 / (100 - percentage)))}`
}

export function _renderProductPriceAsAmount(product) {
	let priceStatus = getProductPriceStatus(product.variations)
	if(priceStatus.type == 'const') {
	    return product.price
	}

	let minPrice = minPriceTemplate
	let prices = []
	const variations_lookup = product.variations_lookup

	for (var property in variations_lookup) {
	    if (variations_lookup.hasOwnProperty(property)) {
	        let price = variations_lookup[property].price

	        if(priceStatus.type == 'single' && !product.is_variations_mixed) {
	    		if(property[1] != priceStatus.variation_index) continue
	    	}
	    
	        prices.push(price)
	    }
	}

	prices.sort((a, b) => a - b)
	return prices[0]
}

export function _renderCustomProductPrice(product) {
	return product.price_detail.total_price
}

export function _renderProductPrice (product) {
	let priceStatus = getProductPriceStatus(product.variations)

	if(priceStatus.type == 'const') {
		if(product.price == 1) {
			return '??? ₮'
		}
		
	    return currencyFormat(product.price)
	}

	let minPrice = minPriceTemplate
	let prices = []
	const variations_lookup = product.variations_lookup

	for (var property in variations_lookup) {
	    if (variations_lookup.hasOwnProperty(property)) {
	        let price = variations_lookup[property].price

	        if(priceStatus.type == 'single' && !product.is_variations_mixed) {
	    		if(property[1] != priceStatus.variation_index) continue
	    	}
	    
	        prices.push(price)
	    }
	}

	prices.sort((a, b) => a - b)
	return (prices.every(function(value, _, array) { return array[0] == value }) ? '' : '+') + currencyFormat(prices[0])
}

export function _renderProductPriceDetail (product) {
	let hasConstPrice = true

	product.variations.forEach((variation) => {
	    if(variation.has_different_price) hasConstPrice = false
	})

	if(hasConstPrice) {
	    return currencyFormat(product.price)
	}

	let minPrice = minPriceTemplate
	let prices = []
	const variations_lookup = product.variations_lookup

	for (var property in variations_lookup) {
	    if (variations_lookup.hasOwnProperty(property)) {
	        let price = variations_lookup[property].price
	        prices.push(price)
	    }
	}

	prices = _.sortBy(prices, (price) => { return price })

	return (prices.every(function(value, _, array) { return array[0] === value }) ? '' : '+') + prices[0] +'₮'
}

export function _renderProductQuantity (product) {
	if(_.isEmpty(product)) return 0

    let hasConstQuantity = true

    product.variations.forEach((variation) => {
        if(variation.has_different_quantity) hasConstQuantity = false
    })

    if(hasConstQuantity) {
        return product.quantity
    }

    let totalQuantity = 0
    const variations_lookup = product.variations_lookup

    for (var property in variations_lookup) {
       if (variations_lookup.hasOwnProperty(property)) {
           totalQuantity += parseInt(variations_lookup[property].quantity)
       } 
   }

    return totalQuantity
}

export function AreaOfRectangle(rect, rect2) {
	//var d0 = divs.eq(0).position()
	//var d1 = divs.eq(1).position()
	var d1x = rect.left
	var d1y = rect.top

	var d1xMax = rect.left + rect.width
	var d1yMax = rect.top + rect.height

	var d2x = rect2.left
	var d2y = rect2.top

	var d2xMax = rect2.left + rect2.width
	var d2yMax = rect2.top + rect2.height

	var x_overlap = Math.max(0, Math.min(d1xMax, d2xMax) - Math.max(d1x, d2x))
	var y_overlap = Math.max(0, Math.min(d1yMax, d2yMax) - Math.max(d1y, d2y))

	return x_overlap * y_overlap
}