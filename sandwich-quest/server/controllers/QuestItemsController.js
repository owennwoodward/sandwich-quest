import { Auth0Provider } from "@bcwdev/auth0provider"
import { questItemsService } from "../services/QuestItemsService"
import BaseController from "../utils/BaseController"
import { logger } from "../utils/Logger"



export class QuestItemsController extends BaseController {
    constructor() {
        super('api/items')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createItem)
            .put('/:id', this.editItem)
            .delete('/:id', this.removeItem)
    }




    async createItem(req, res, next) {
        try {
            const Item = await questItemsService.createItem(req.body, req.userInfo.id)
            return res.send(Item)
        } catch (error) {
            next(error)
        }

    }

    async editItem(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const Item = await questItemsService.editItem(req.userInfo.id, req.body)
            return res.send(Item)
        } catch (error) {
            next(error)

        }
    }
    async removeItem(req, res, next) {
        try {
            const Item = await questItemsService.removeItem(req.params.id, req.userInfo.id)
            return res.send('This item has been deleted')
        } catch (error) {
            next(error)
        }
    }




}

