import { AppState } from "../AppState"
import { api } from "./AxiosService"


class QuestsService {

  async createQuest(questData) {
    const quest = await api.post('api/quests', questData)
    console.log('-createQuest-', quest)
    AppState.quests = [quest, ...AppState.quests]
  }

  async getMyQuests() {
    // if (!accountId) {
    //   return true
    // }
    const res = await api.get('account/quests')
    console.log('get my account quests', res.data)
    AppState.quests = res.data
    return res.data
  }

}

export const questsService = new QuestsService()