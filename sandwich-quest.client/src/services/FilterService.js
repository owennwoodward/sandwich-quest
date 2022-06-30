import { AppState } from "../AppState"



class FilterService{
filterCoffee(){
    AppState.homeRestaurants = AppState.homeRestaurants.filter(b => {
        b.categories.forEach(c => c.alias.includes('coffee'))
    })
 };
}


export const filterService = new FilterService()