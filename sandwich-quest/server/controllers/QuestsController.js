import { Auth0Provider } from "@bcwdev/auth0provider";
import { questsService } from "../services/QuestsService";
import BaseController from "../utils/BaseController";



export class QuestsController extends BaseController {
    constructor() {
        super('api/quests')
        this.router
            .get('', this.getAllQuests)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createQuest)
            .delete('/:id', this.removeQuest)
    }

    async getAllQuests(req, res, next) {
        try {
            const quests = await questsService.getAllQuests()
            return res.send(quests)
        } catch (error) {
            next(error)
        }
    }

    async createQuest(req, res, next) {
        try {
            const quest = await questsService.createQuest(req.body)
            return res.send(quest)
        } catch (error) {
            next(error)
        }
    }
    async removeQuest(req, res, next) {
        try {
            const message = await questsService.removeQuest(req.params.id, req.userInfo.id)
            return res.send('deleted', message)
        } catch (error) {
            next(error)
        }
    }
}