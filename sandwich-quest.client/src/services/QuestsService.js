import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class QuestsService {

  async createQuest(questData) {
    const quest = await api.post('api/quests', questData)
    console.log('-createQuest-', quest.data)
    AppState.quests.unshift(quest.data)
    return quest.data
  }

  async getMyQuests(query = {}) {
    // if (!accountId) {
    //   return true
    // }
    const res = await api.get('account/quests', query)
    console.log('get my account quests', res.data)
    AppState.quests = res.data
    return res.data
  }

 async getQuestItems(id) {
    const res = await api.get(`api/quests/${id}/items`)
    console.log(res.data, 'getting quest items');
    AppState.questitems = res.data
  }
}


export const questsService = new QuestsService()