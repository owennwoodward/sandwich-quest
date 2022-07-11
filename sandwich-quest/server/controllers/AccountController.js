import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { questsService } from '../services/QuestsService.js'
import BaseController from '../utils/BaseController'
import { questItemsService } from '../services/QuestItemsService.js'
import { logger } from '../utils/Logger'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/quests', this.getUserQuests)
      .get('/questItems', this.getUserQuestItems)
      .put('', this.editAccount)
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

  async editAccount(req, res, next) {
    try {
      // logger.log('made it to controller')
      const account = await accountService.updateAccount(req.userInfo, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }

  }
}
