import { dbContext } from "../db/DbContext.js";
import {BadRequest} from "@bcwdev/auth0provider/lib/Errors.js";

class QuestsService{
    async getAllQuests(query={}){
        let quests = await dbContext.Quests.find(query).populate(
            "creator",
            "name picture"
        );
        return quests;

        }
    async getQuestById(id){
        let quest = await dbContext.Quests.findById(id).populate(
            "creator",
            "name picture"
        );
        return quest;
    }
    async createQuest(quest){
        let newQuest = await dbContext.Quests.create(quest);
        await newQuest.populate("creator", "name picture")
        return newQuest;
    }


    // TODO: Add updateQuest

    async deleteQuest(id, userId){
        let quest = await dbContext.Quests.findById(id);
        if(!quest){
            throw new BadRequest("Invalid quest id");
        }
        if(quest.creatorId.toString() !== userId){
            throw new BadRequest("You do not have permission to delete this quest");
        }

        await quest.remove();
    }

}


export const questsService = new QuestsService();