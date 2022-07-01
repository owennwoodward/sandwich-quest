import { AppState } from "../AppState";
import { api } from "./AxiosService"

class QuestItemsService {

  async createQuestItem(itemData) {
    const res = await api.post('api/items', itemData);
    console.log('-createQuestItem-', res.data)
    // Change appstate??
  }

}


export const questItemsService = new QuestItemsService()