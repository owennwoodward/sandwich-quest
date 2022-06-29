import { dbContext } from "../db/DbContext.js";
import {BadRequest} from "@bcwdev/auth0provider/lib/Errors.js";

class QuestsService{
    async getAllQuests(query={}){
        let quests = await dbContext.Quests.find(query).populate(
            

        )
}

}
export const questsService = new QuestsService();