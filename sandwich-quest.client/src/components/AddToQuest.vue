<template lang="">
  <div>
    <div>
      <form>
    <button type="submit"  class="btn btn-primary " @click.prevent="addToCollection">Add to Quest</button>
         <select v-model="questBar.questId">
          <!--  v-model="questBar.questId" -->
              <option v-for="q in quests" :key="q.id" :value="q.id" >
               {{q.name}}
              </option>
            </select>
         </form>
      </div>
  </div>
</template>
<script>
import { computed, onMounted } from '@vue/runtime-core'
import { watchEffect, ref } from "vue"
import { useRoute } from "vue-router"
import { AppState } from "../AppState.js"
import { questsService } from "../services/QuestsService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { questItemsService} from "../services/QuestItemsService"
export default {
  props: {
    quests: {
      type: Object,
      required: true
    },
    restaurantId: {
      type: String,
      required: true
    }
  },
    setup(props) {
        const route = useRoute()
        const questBar = ref({})

        onMounted(async ()=>{
         try {
           await  questsService.getMyQuests()
         } catch (error) {
         Pop.toast(error, 'error')
         console.error(error);
         }
        })

        watchEffect( async () => {
            try {
              // await yelpService.getById(route.params.id)
              await questsService.getMyQuests()
            } catch (error) {
              logger.error(error)
              Pop.toast(error.message, 'error')
            }
        })
        return {
          questBar,
            homeRestaurant:computed(()=> AppState.activeRestaurant),
            quests: computed(() => AppState.quests.sort((a,b) => a.updatedAt - b.updatedAt)),

            async addToCollection() {
              console.log('-adding to quest-', questBar.value.questId)

              //massage the data

              let newItem = {
                name: AppState.activeRestaurant.name,
                questId: questBar.value.questId,
              }

             try {
               await questItemsService.createQuestItem(newItem)
               Pop.toast('Added Item')
             } catch (error) {
             Pop.toast(error, 'error')
             console.error(error);
             }
            }

        }
    }
}
</script>
<style scoped lang="scss">
  
</style>