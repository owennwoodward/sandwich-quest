<template>
    <div class="component">
        <div v-for="q in questItems" :key="q.id"  class="">
        <QuestItem :quest="q" />
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
            questItems: computed(()=> AppState.questitems)
        }
    }
}
</script>


<style lang="scss" scoped>
</style>