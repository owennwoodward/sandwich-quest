import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { questsService } from '../services/QuestsService.js'
import BaseController from '../utils/BaseController'
import { questItemsService } from '../services/QuestItemsService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/quests', this.getUserQuests)
      .get('/questItems', this.getUserQuestItems)
    // .put('', this.editAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
  async getUserQuests(req, res, next) {
    try {
      const quests = await questsService.getUserQuests(req.userInfo.id)
      return res.send(quests)
    } catch (error) {
      next(error)
    }
  }
  async getUserQuestItems(req, res, next) {
    try {
      const questItems = await questItemsService.getUserQuestItems(req.userInfo.id)
      res.send(questItems)
    } catch (error) {
      next(error)
    }
  }

  // async updateAccount(req, res, next) {
  //   const account = await accountService.updateAccount(req.body.value, req.userInfo)
  // }
}
