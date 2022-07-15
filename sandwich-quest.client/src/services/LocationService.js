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
        // const location = await getCoords()
        AppState.currentCoords = await getCoords()
        console.log(AppState.currentCoords.coords.latitude, AppState.currentCoords.coords.longitude, AppState.currentCoords )
        
                    // AppState.currentCoords.latitude = location.coords.latitude
                    // AppState.currentCoords.longitude = location.coords.longitude
    }
}

export const locationService = new LocationService()