import { AppState } from "../AppState";
import { logger } from "../utils/Logger";


class MapsService{

getStaticMap(questId){
  
    let allDoneCoords = ''
    let allUndoneCoords = ''
    let cleanedDoneCoords = ''
    let cleanedUndoneCoords = ''
    let filteredQuestItems = AppState.questitems.filter(qi => qi.questId == questId)
    let doneQuestItems = filteredQuestItems.filter(qi => qi.isChecked == true)
    let undoneQuestItems = filteredQuestItems.filter(qi => qi.isChecked == false)
    doneQuestItems.forEach(qi => {
        allDoneCoords += qi.coordinates.latitude + "," + qi.coordinates.longitude + "|"
    })
    undoneQuestItems.forEach(qi => {
        allUndoneCoords += qi.coordinates.latitude + "," + qi.coordinates.longitude + "|"
    })
    cleanedDoneCoords = this.cleanCoords(allDoneCoords)
    cleanedUndoneCoords = this.cleanCoords(allUndoneCoords)

    let map =  `https://maps.googleapis.com/maps/api/staticmap?size=600x300&markers=color:blue|${cleanedDoneCoords}&markers=color:red|${cleanedUndoneCoords}&key=AIzaSyAQaE5n_90mQg1JByV_OQ7q5wloxgLuqCY`
    console.log(map)
    let foundQuest = AppState.quests.find(q => q.id == questId)
    if (foundQuest){
        foundQuest.map = map
    }
        

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