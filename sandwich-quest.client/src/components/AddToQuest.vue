<template lang="">
  <div  v-if="account.id != undefined && quests.length > 0">
    <div>
      <form>
    <button type="submit"  class="btn btn-primary " @click.prevent="addToCollection">Add to Quest</button>
         <select  v-if="quests[0] != undefined" required v-model="questBar.questId">
          <!--  v-model="questBar.questId" -->
              <option v-for="q in quests" :key="q.id" :value="q.id" >
               {{q.name}}
              </option>
            </select>
         </form>
      </div>
  </div>
  <div v-else-if="account.id != undefined && appQuests.length == 0">
    <div class="text-muted fst-italic">Use the New Quest button to begin!</div>
  </div>
</template>
<script>
import { computed } from '@vue/runtime-core'
import {  ref } from "vue"
import { useRoute } from "vue-router"
import { AppState } from "../AppState.js"
import Pop from "../utils/Pop.js"
import { questItemsService} from "../services/QuestItemsService"
export default {
  props: {
    restaurant: {
      type: Object,
      required: true
    }
  },
    setup(props) {
        const route = useRoute()
        const questBar = ref({})

        // onMounted(async ()=>{
        //  try {
        //     if (!AppState.quests[0]) {
        //         await questsService.getMyQuests()

        //       }
        //  } catch (error) {
        //  Pop.toast(error, 'error')
        //  console.error(error);
        //  }
        // })

        // watchEffect( async () => {
        //     try {
        //       // await yelpService.getById(route.params.id)
        //       if (!AppState.quests[0]) {
        //         await questsService.getMyQuests()

        //       }
        //     } catch (error) {
        //       logger.error(error)
        //       Pop.toast(error.message, 'error')
        //     }
        // })
        return {
          questBar,
            homeRestaurant:computed(()=> AppState.activeRestaurant),
            appQuests: computed(() => AppState.quests),
            quests: computed(() =>  {
              const sorted = AppState.quests.sort((a,b) => a.updatedAt - b.updatedAt);
              return sorted.filter(q => {
                const found = AppState.questitems.find(qi =>  qi.restaurantId == props.restaurant.id && qi.questId == q.id);
                if(q.id != found?.questId) {
                  return true
                }
                return false
              })
            }),
            account: computed(() => AppState.account),


            canBeOption(questId) {
            },


            async addToCollection() {


              //massage the data

              let newItem = {
                name: props.restaurant.name,
                questId: questBar.value.questId,
                restaurantId: props.restaurant.id,
                yelpRate: props.restaurant.rating,
                streetAddress: props.restaurant.location
              }

             try {
               await questItemsService.createQuestItem(newItem)
               Pop.toast('Added Quest Item')
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