import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js";

<<<<<<< HEAD
class QuestsService {
    async getAllQuests(query = {}) {
=======
class QuestsService{
    async getAllQuests(query={}){
>>>>>>> cf0177f95f5b3d285c701878ed70450047b82002
        let quests = await dbContext.Quest.find(query).populate(
            "creator",
            "name picture"
        );
        return quests;

<<<<<<< HEAD
    }
    async getQuestById(id) {
=======
        }
    async getQuestById(id){
>>>>>>> cf0177f95f5b3d285c701878ed70450047b82002
        let quest = await dbContext.Quest.findById(id).populate(
            "creator",
            "name picture"
        );
        return quest;
    }
<<<<<<< HEAD
    async createQuest(quest) {
=======
    async createQuest(quest){
>>>>>>> cf0177f95f5b3d285c701878ed70450047b82002
        let newQuest = await dbContext.Quest.create(quest);
        await newQuest.populate("creator", "name picture")
        return newQuest;
    }


    // TODO: Add updateQuest

<<<<<<< HEAD
    async deleteQuest(id, userId) {
        let quest = await dbContext.Quest.findById(id);
        if (!quest) {
=======
    async removeQuest(id, userId){
        let quest = await dbContext.Quest.findById(id);
        if(!quest){
>>>>>>> cf0177f95f5b3d285c701878ed70450047b82002
            throw new BadRequest("Invalid quest id");
        }
        if (quest.creatorId.toString() !== userId) {
            throw new BadRequest("You do not have permission to delete this quest");
        }

        await quest.remove();
    }

}


export const questsService = new QuestsService();