const { AppState } = require("../AppState")
const { api } = require("./AxiosService")


class QuestsService {

  async createQuest(questData) {
    const quest = await api.post('api/quests', questData)
    console.log('-createQuest-', res.data)
    AppState.quests = [res.data, ...AppState.quests]
  }

}

const questsService = new QuestsService()