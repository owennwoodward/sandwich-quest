import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js";

class QuestsService {
    async getAllQuests(query = {}) {
        let quests = await dbContext.Quest.find(query).populate(
            "creator",
            "name picture"
        );
        return quests;

    }
    async getQuestById(id) {
        let quest = await dbContext.Quest.findById(id).populate(
            "creator",
            "name picture"
        );
        return quest;
    }
    async createQuest(quest) {
        let newQuest = await dbContext.Quest.create(quest);
        await newQuest.populate("creator", "name picture")
        return newQuest;
    }

    async editQuest(id, body) {
        let quest = await dbContext.Quest.findById(id);
        if (!quest) {
            throw new BadRequest("Invalid quest id");
        }
        quest.name = body.name;
        quest.description = body.description;
        quest.picture = body.picture;
        await quest.save();
        return quest;
    }







    async removeQuest(id, userId) {
        let quest = await dbContext.Quest.findById(id);
        if (!quest) {
            throw new BadRequest("Invalid quest id");
        }
        if (quest.creatorId.toString() !== userId) {
            throw new BadRequest("You do not have permission to delete this quest");
        }

        await quest.remove();
    }
   

}


export const questsService = new QuestsService();