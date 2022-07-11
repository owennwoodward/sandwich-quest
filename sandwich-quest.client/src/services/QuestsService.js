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
    const res = await api.get('account/quests', query)
    // console.log('get my account quests', res.data)
    AppState.quests = res.data
    return res.data
  }

  async editQuest() {
    const res = await api.put('api/quests/' + questData.id, questData)
    logger.log('edit quest', res.data)
  }

  async removeQuest(id) {
    const res = await api.delete('api/quests/' + id)
    logger.log(res.data, 'deleting quest');
    AppState.quests = AppState.quests.filter(q => q.id != id)
  }
}


export const questsService = new QuestsService()