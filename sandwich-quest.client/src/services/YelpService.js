import Axios from 'axios'
import { api } from './AxiosService'
import { baseURL } from '../env'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger.js'
import { locationService } from './LocationService'
export const yelp = Axios.create({
  baseURL,
  timeout: 8000,
  })


let location = ''
let categories = ''
let term = ''
let coords = {}
class YelpService {
    async getAll(query = '') {
        try {
            await locationService.getUserCoordinates()
        } catch (error) {
            console.error(error)
        }
        location = AppState.currentLocation || 'boise'
        categories = AppState.currentCategories
        coords = AppState.currentCoords.coords
        term = query
        
        if (!AppState.currentCoords?.coords?.latitude || AppState.currentLocation) {
            const res = await api.get('yelp', {params: {categories: categories, location: location, term: term }})
            AppState.homeRestaurants = res.data
             return
        }

        const res = await api.get('yelp', {params: {categories: categories, location: location, latitude: coords.latitude, longitude:coords.longitude, term: term }})
        // console.log(res.data, 'here is the get all res')
        AppState.homeRestaurants = res.data
    }
    async getById(id) {
        const res = await api.get(`yelp/${id}`)
        AppState.activeRestaurant = res.data
        // logger.log('getById', res.data)
    }
   


}

export const yelpService = new YelpService()