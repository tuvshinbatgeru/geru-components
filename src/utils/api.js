import axios from 'axios'
export const BASE_URL = 'https://geru-rest-api.herokuapp.com'

export function request(headerOptions) {
    let query = {
        // timeout: TIMEOUT,
        baseURL: BASE_URL + '/'
    }

    if (headerOptions) {
        Object.assign(query, {
            headers: {
                ...headerOptions
            }
        })
    }

    return axios.create(query)
}

export function fetchCustomProducts() {
	return request().get(`/api/customization`)
}