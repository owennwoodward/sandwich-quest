import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js";
import { logger } from "../utils/Logger.js";


class QuestItemsService {
    getQuestItems(questId) {
        const questItems = dbContext.QuestItem.find({ questId });
        // logger.log('-GetQuestItems-', questItems)
        return questItems;


    }
    async editItem(accountId, update) {
        const original = await dbContext.QuestItem.findById(update.id)

        if (original.creatorId.toString() != accountId) {
            throw new BadRequest('You are not the person you say you are')
        }

        original.myNotes = update.myNotes || original.myNotes;
        original.isChecked = update.isChecked || original.isChecked;


        // TODO this is really rough, might be able to be a ternary
        original.isChecked = true

        if (update.isChecked === false) {
            original.isChecked = false
        }

        original.save()
        return original
        
    }
    async getUserQuestItems(creatorId) {
        let questItems = await dbContext.QuestItem.find({ creatorId })
            .populate("creator", "name picture")
        return questItems;
    }

    async createItem(questItem, creatorId) {
        const itemExists = await dbContext.QuestItem.findOne({questId: questItem.questId, restaurantId: questItem.restaurantId})

        if (itemExists) {
            throw new BadRequest('That item is already in this quest')
        }


        questItem.creatorId = creatorId
        let newQuestItem = await dbContext.QuestItem.create(questItem);
        await newQuestItem.populate("creator")

        return newQuestItem;
    }

    async removeItem(id, userId) {
        let questItem = await dbContext.QuestItem.findById(id);
        if (!questItem) {
            throw new BadRequest("Invalid quest item id");
        }
        if (questItem.creatorId.toString() !== userId) {
            throw new BadRequest("You do not have permission to delete this quest item");
        }

        await questItem.remove();
        return "deleted";
    }


}

export const questItemsService = new QuestItemsService();