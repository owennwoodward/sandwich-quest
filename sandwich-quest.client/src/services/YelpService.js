import Axios from 'axios'
import { api } from './AxiosService'
import { baseURL } from '../env'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger.js'
export const yelp = Axios.create({
  baseURL,
  timeout: 8000,
  })

// TODO yelp service in server, CORS requires this from the backend instead of frontend.

let location = 'boise'
class YelpService {
    async getAll(query = '') {
        const res = await api.get('yelp', {params: {categories: 'food', location: location, term: query }})
        console.log(res.data, 'here is the get all res')
        AppState.homeRestaurants = res.data
    }
    async getById(id) {
        const res = await api.get(`yelp/${id}`)
        AppState.activeRestaurant = res.data
        logger.log('getById', res.data)
    }
    

}

export const yelpService = new YelpService()