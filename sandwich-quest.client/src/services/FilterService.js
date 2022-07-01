import { AppState } from "../AppState"
import { logger } from "../utils/Logger"


let categories = []

class FilterService{
    
filterCoffee(){
    logger.log("calling function in service")
    let businesses = AppState.homeRestaurants.businesses
    let filteredBusinesses = []

    for (let index = 0; index < businesses.length; index++) {
        for (let j = 0; j < businesses[index].categories.length; j++) {
            categories += businesses[index].categories[j].alias
            categories += ' '
            logger.log(categories, 'here are the categories')
        }
        if (categories.includes('coffee')) {
            filteredBusinesses.push(businesses[index])
        }
        categories = []
    }  
    AppState.homeRestaurants.businesses = filteredBusinesses
    logger.log(AppState.homeRestaurants.businesses)
  
 };
}


export const filterService = new FilterService()