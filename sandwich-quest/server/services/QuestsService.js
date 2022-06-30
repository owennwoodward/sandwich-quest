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
  async getUserQuests(id) {
    const quest = await dbContext.Quest.find({ creatorId: id })
    logger.log('getting your posts', quest)
    return quest
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
    let quest = await dbContext.Quest.findById(id);
    if (!quest) {
      throw new BadRequest("Invalid quest id");
    }
    if (quest.creatorId.toString() !== userId) {
      throw new BadRequest("You do not have permission to delete this quest");
    }

    await quest.remove();
    return "deleted";
  }
}

export const questsService = new QuestsService();