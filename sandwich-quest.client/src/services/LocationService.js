import { AppState } from "../AppState";
import { logger } from "../utils/Logger";

async function getCoords() {

    return new Promise(function (resolve, reject) {
        // console.log('made it to get user coords in locationservice')
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}
// let coords = getCoords()
class LocationService {

    async getUserCoordinates() {
        AppState.currentCoords = await getCoords()
        
                    // AppState.currentCoords.latitude = coords.coords.latitude
                    // AppState.currentCoords.longitude = coords.coords.longitude
                    console.log(AppState.currentCoords.coords.latitude, AppState.currentCoords.coords.longitude )
    }
}

export const locationService = new LocationService()