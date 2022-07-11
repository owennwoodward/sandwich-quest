<template>

    <HomeRestaurant :homeRestaurant="homeRestaurant"/>
    
</template>


<script>
import { computed, onMounted } from '@vue/runtime-core'
import { watchEffect } from "vue"
import { useRoute } from "vue-router"
import { AppState } from "../AppState.js"
import { questItemsService } from "../services/QuestItemsService.js"

import { questsService } from "../services/QuestsService.js"
import { yelpService } from "../services/YelpService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
export default {
    setup() {
        const route = useRoute()


        onMounted( async () => {
            try {
              await yelpService.getById(route.params.id)
              await questsService.getMyQuests()
              await questItemsService.getMyQuestItems()
            } catch (error) {
              logger.error(error)
              Pop.toast(error.message, 'error')
            }
        })
        return {
            homeRestaurant:computed(()=> AppState.activeRestaurant),
            quests: computed(() => AppState.quests.sort((a,b) => a.updatedAt - b.updatedAt)),
            routeId: computed(()=> route.params.id),
            addToCollection() {

            }

        }
    }
}
</script>


<style lang="scss" scoped>

.stars {
    display: flex;
    flex-direction: row-reverse;
    transform: scale(.75);
}
</style>