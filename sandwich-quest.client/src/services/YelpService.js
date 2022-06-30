import Axios from 'axios'
import { api } from './AxiosService'
import { baseURL } from '../env'
export const yelp = Axios.create({
  baseURL,
  timeout: 8000,
  })

// TODO yelp service in server, CORS requires this from the backend instead of frontend.

class YelpService {
    async getAll(query = '') {
        const res = await api.get('yelp', {params: {categories: 'food', location: 'boise', term: query }})
        console.log(res.data, 'here is the get all res')
    }
}

export const yelpService = new YelpService()