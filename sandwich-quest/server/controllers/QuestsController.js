import { Auth0Provider } from "@bcwdev/auth0provider";
import { questsService } from "../services/QuestsService";
import { questItemsService } from "../services/QuestItemsService";
import BaseController from "../utils/BaseController";

export class QuestsController extends BaseController {
  constructor() {
    super("api/quests");
    this.router
      .get("", this.getAllQuests)
      .get("/:id", this.getQuestById)
      .get("/:id/items", this.getQuestItems)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createQuest)
      .delete("/:id", this.removeQuest);
  }
  async getQuestById(req, res, next) {
    try {
      const quest = await questsService.getQuestById(req.params.id);
      return res.send(quest);
    } catch (error) {
      next(error);
    }
  }

  async getAllQuests(req, res, next) {
    try {
      const quests = await questsService.getAllQuests(req.query);
      return res.send(quests);
    } catch (error) {
      next(error);
    }
  }
  async getQuestItems(req, res, next) {
    try {
      const questItems = await questItemsService.getQuestItems(req.params.id);
      return res.send(questItems);
    } catch (error) {
      next(error);
    }
  }

  async createQuest(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;
      const quest = await questsService.createQuest(req.body);
      return res.send(quest);
    } catch (error) {
      next(error);
    }
  }
  async editQuest(req, res, next) {
    try {
      req.quest.creatorId = req.userInfo.id;
      const quest = await questsService.editQuest(req.params.id, req.body);
      return res.send(quest);
    } catch (error) {
      next(error);
    }
  }

  async removeQuest(req, res, next) {
    try {
        req.body.accountId = req.userInfo.id;   
      const message = await questsService.removeQuest(
        req.params.id,
        req.userInfo.id
      );
      return res.send(message);
    } catch (error) {
      next(error);
    }
  }
}
