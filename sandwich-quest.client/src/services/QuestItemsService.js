import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService"

class QuestItemsService {

  async createQuestItem(itemData) {
    const res = await api.post('api/items', itemData);
    console.log('-createQuestItem-', res.data)
    // Change appstate??
  }

async getMyQuestItems(){
  const res = await api.get('account/questItems')
  logger.log('here is the all quest items', res.data)
  AppState.questitems = res.data
}

}


export const questItemsService = new QuestItemsService()