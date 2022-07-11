import { AppState } from "../AppState"
import { logger } from "../utils/Logger"




// NOTE This service is not used, we refactored it to a ref object on the homepage. Keeping as an example of refactoring.

let categories = []

class FilterService{
    
filter(category){
    let businesses = AppState.homeRestaurants.businesses
    let filteredBusinesses = []
    for (let index = 0; index < businesses.length; index++) {
        for (let j = 0; j < businesses[index].categories.length; j++) {
            categories += businesses[index].categories[j].alias
            categories += ' '
            // logger.log(categories, 'here are the categories')
        }
        if (categories.includes(category)) {
            filteredBusinesses.push(businesses[index])
        }
        categories = []
    }  
    AppState.homeRestaurants.businesses = filteredBusinesses
    // logger.log(AppState.homeRestaurants.businesses)
  
 };
}


// export const filterService = new FilterService()