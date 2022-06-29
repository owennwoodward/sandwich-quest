import Axios from 'axios'
export const yelp = Axios.create({
  baseURL: 'https://api.yelp.com/v3',
  timeout: 8000,
  params: {
    api_key: ''
  }
})

// TODO yelp service in server, CORS requires this from the backend instead of frontend.

class YelpService {
    async getAll(query = '') {
        const res = await yelp.get('business/search', {params: {categories: 'food', term: query }})
        console.log(res.data)
    }
}

export const yelpService = new YelpService()