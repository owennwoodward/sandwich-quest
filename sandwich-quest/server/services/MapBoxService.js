import axios from "axios";
import { logger } from "../utils/Logger.js";
import { BadRequest } from "@bcwdev/auth0provider/lib/Errors";



export const mapBox = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/',
    timeout: 8000,
    // headers: {
    //     authorization: ``
    // }
    params:{
        access_token: 'pk.eyJ1IjoiYmlnZGFkZHlkb20iLCJhIjoiY2w1azRxeHpsMDZpNTNmcGV4dTE2dXUxdCJ9.lUKUQoRd_memrOQ3bxOfLg'
    }
})

class MapBoxService {
    async getAll(params){
        const res = await mapBox.get('/mapbox/driving', { params })
        if (!res.data) {
            throw new BadRequest('Idiot, try again')
        }
        return res.data

    }
    async getById(mapBoxId){
        const res = await mapBox.get(`/mapbox/driving/${mapBoxId}`)
        if (!res.data) {
            throw new BadRequest('Idiot, not the right ID')
        }
        return res.data
    }
}


export const mapBoxService = new MapBoxService()