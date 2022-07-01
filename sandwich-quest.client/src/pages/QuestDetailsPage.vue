<template>
    <div class="component">
        <h2>{{quest.name}}</h2>
        
        <div v-for="q in questItems" :key="q.id"  class="">
        <!-- <QuestItem :quest="q" /> -->
        <!-- <HomeRestaurant :homeRestaurant="q" /> -->
        </div>
    </div>
</template>


<script>
import { computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import { AppState } from "../AppState";
import { questItemsService } from "../services/QuestItemsService";
import { questsService } from "../services/QuestsService";
import Pop from "../utils/Pop";

export default {
    name: 'QuestDetails',
    setup() {
     const route = useRoute()
     onMounted(async () => {
       try {
         await questsService.getMyQuests(route.params.id)
         await questsService.getQuestItems(route.params.id)
       } catch (error) {
       Pop.toast(error, 'error')
       console.error(error);
       }
     });
        return {
            questItems: computed(()=> AppState.questitems),
            quest: computed(()=> AppState.quests.find(q => q.id == route.params.id))
        }
    }
}
</script>


<style lang="scss" scoped>
</style>