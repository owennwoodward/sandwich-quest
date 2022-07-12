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
    const res = await api.get('account/quests')
    AppState.quests = res.data
    return res.data
  }


  async editAccount(editData) {
    
    const res = await api.put('/account', editData)
    // logger.log(res.data)
    AppState.account = res.data
  }

}


export const accountService = new AccountService()
