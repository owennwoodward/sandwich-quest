import { AppState } from "../AppState";
import { logger } from "../utils/Logger";


class MapsService{

getStaticMap(questId){
    
    let allCoords = ''
    let cleanedCoords = ''
    let filteredQuestItems = AppState.questitems.filter(qi => qi.questId == questId)
    filteredQuestItems.forEach(qi => {
        allCoords += qi.coordinates.latitude + "," + qi.coordinates.longitude + "|"
    })
    cleanedCoords = this.cleanCoords(allCoords)

    let map =  `https://maps.googleapis.com/maps/api/staticmap?size=600x300&markers=${cleanedCoords}&key=AIzaSyAQaE5n_90mQg1JByV_OQ7q5wloxgLuqCY`
    console.log(map)
    let foundQuest = AppState.quests.find(q => q.id == questId)
    foundQuest.map = map
    
 
}


cleanCoords(dirtyString){
    let cleanString = dirtyString
    if (cleanString[cleanString.length-1] == '|'){
        cleanString.slice(0, (cleanString.length-1))
    }
    cleanString.replace(',', '%2c')
    cleanString.replace('|', '%7c')
    return cleanString
}

}

export const mapsService = new MapsService