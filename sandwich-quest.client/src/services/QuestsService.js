const { api } = require("./AxiosService")


class QuestsService {

  async createQuest(questData) {
    const quest = await api.post('api/quests', questData)
    console.log('-createQuest-', res.data)
    
  }

}

const questsService = new QuestsService()