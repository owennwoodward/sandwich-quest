import { dbContext } from "../db/DbContext.js";
import { logger } from "../utils/Logger.js";
import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js";

class QuestsService {


  // getQuestItems(id) {
  //     throw new Error("Method not implemented.");
  // }
  async getAllQuests(query) {
    let quests = await dbContext.Quest.find(query).populate(
      "creator",
      "name picture"
    );
    return quests;
  }
  async getQuestById(id) {
    let quest = await dbContext.Quest.findById(id).populate("creator", "name picture");
    logger.log("getQuestById", quest);
    return quest;
  }

  // Come back after lunch and write this get user quest logic
  async getUserQuests(creatorId) {
    const quests = await dbContext.Quest.find({ creatorId })
    if (!quests) {
      throw new BadRequest('something went wrong')
    }
    logger.log('getting your Quests', quests)
    return quests
  }
  async createQuest(quest, userId) {
    quest.creatorId = userId;
    let newQuest = await dbContext.Quest.create(quest);
    await newQuest.populate("creator", "name picture");
    return newQuest;
  }

  async editQuest(id, questData) {
    const original = await dbContext.Quest.findById(id).populate("creator", "name picture")
    if (original.creatorId.toString() != questData.creatorId)
      throw new Forbidden("can't edit that")
    original.name = questData.name ? questData.name : original.name
    original.save()
    logger.log('edited', original)
    return original

  }

  async removeQuest(id, userId) {
    const quest = await dbContext.Quest.findById(id);
    // if (!quest) {
    //   throw new BadRequest("Invalid quest id");
    // }
    if (quest.creatorId.toString() !== userId) {
      throw new BadRequest("You do not have permission to delete this quest");
    }

    await quest.remove();
    await dbContext.QuestItem.deleteMany({questId: id})

    return "deleted";
  }
}

export const questsService = new QuestsService();
