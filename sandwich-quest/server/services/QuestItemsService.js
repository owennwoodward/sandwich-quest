import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js";


class QuestItemService{
    async getQuestItems(accountId){
        let questItems = await dbContext.QuestItem.find({accountId})
        .populate("creator", "name picture")
        return questItems;
    }

    async createQuestItem(questItem){
        let newQuestItem = await dbContext.QuestItem.create(questItem);
        await newQuestItem.populate("creator")
      
        return newQuestItem;
    }

    async removeQuestItem(id, userId){
        let questItem = await dbContext.QuestItem.findById(id);
        if(!questItem){
            throw new BadRequest("Invalid quest item id");
        }
        if(questItem.creatorId.toString() !== userId){
            throw new BadRequest("You do not have permission to delete this quest item");
        }

        await questItem.remove();
        return "deleted";
    }
}

export const questItemService = new QuestItemService();