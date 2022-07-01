<template>
    <div class="component">
        

    </div>
</template>


<script>
import { onMounted } from "vue"
import { useRoute } from "vue-router"
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
            
        }
    }
}
</script>


<style lang="scss" scoped>
</style>