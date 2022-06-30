import { AppState } from "../AppState"
import { api } from "./AxiosService"


class QuestsService {

  async createQuest(questData) {
    const quest = await api.post('api/quests', questData)
    console.log('-createQuest-', quest)
    AppState.quests = [quest, ...AppState.quests]
  }

}

export const questsService = new QuestsService()