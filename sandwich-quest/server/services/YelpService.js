import { BadRequest } from "@bcwdev/auth0provider/lib/Errors";
import axios from "axios";
import { logger } from "../utils/Logger";
export const yelp = axios.create({
  baseURL: 'https://api.yelp.com/v3',
  timeout: 8000,
  headers: {
    authorization: `Bearer 2Ej5gF-03AwbccPHRTDw4-808S6PocQQFs9Jg3gBqOUPoZ27_F_Pd63QUHbVlT1XV9lUgPzw4hpXQUTppaVirTFoO_gAlT6vyT1MsXr33egDg21TQS2rc2gv1RK6YnYx`
  }

  // params: {
  //   api_key: '2Ej5gF-03AwbccPHRTDw4-808S6PocQQFs9Jg3gBqOUPoZ27_F_Pd63QUHbVlT1XV9lUgPzw4hpXQUTppaVirTFoO_gAlT6vyT1MsXr33egDg21TQS2rc2gv1RK6YnYx'
  // }
})

class YelpService {
  async getAll(params) {
    // logger.log(params)
    const res = await yelp.get('/businesses/search', { params })
    if (!res.data) {
      throw new BadRequest('Not a correct search ry again')
    }
    return res.data
  }
  async getById(yelpId) {
    const res = await yelp.get(`businesses/${yelpId}`)
    if (!res.data) {
      throw new BadRequest('Incorrect Id')
    }
    return res.data
  }

}

export const yelpService = new YelpService()