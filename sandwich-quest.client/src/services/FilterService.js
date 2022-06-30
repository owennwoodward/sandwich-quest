import { AppState } from "../AppState"
import { logger } from "../utils/Logger"



class FilterService{
filterCoffee(){
    logger.log("calling function in service")
    AppState.homeRestaurants.businesses = AppState.homeRestaurants.businesses.filter(b => b.categories.forEach(c => logger.log(c.alias))),
    
    logger.log(AppState.homeRestaurants.businesses)
 };
}


export const filterService = new FilterService()