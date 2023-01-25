import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService"

class QuestItemsService {

  async createQuestItem(itemData) {
    const res = await api.post('api/items', itemData);
    AppState.questitems.push(res.data)
  }

  async getMyQuestItems() {
    const res = await api.get('account/questItems')
    // logger.log('here is the all quest items', res.data)
    AppState.questitems = res.data
  }

  async editChecked(update) {
    let found = AppState.questitems.find(q => q.id == update.id)
    logger.log(found.isChecked)
    found.isChecked = !found.isChecked
    logger.log(found.isChecked)
    const res = await api.put(`api/items/${found.id}`, found)
    logger.log(res.data)
  }
  async editItem(update) {
    const res = await api.put(`api/items/${update.id}`, update)
    let found = AppState.questitems.find(q => q.id == update.id)

    logger.log(res.data)
  }

  async deleteItem(id) {
    const res = await api.delete(`api/items/${id}`)
    logger.log('here is what you deleted', res.data)
    AppState.questitems = AppState.questitems.filter(j => j.id != id)
    return res.data
  }

}


export const questItemsService = new QuestItemsService()