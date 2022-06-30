import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getQuests() {
    try {
      const res = await api.get('api/account/quests')
    } catch (error) {
      logger.error('Cant find quests', error)
    }
  }

  // async editAccount(editData) {
  //   const res = await api.put('/account', editData)
  //   logger.log(res.data)
  //   AppState.account = res.data
  // }
}

export const accountService = new AccountService()
