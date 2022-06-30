<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card" @click="goToRestaurantDetails">
                    <div class="card-header">
                        <h3>{{ homeRestaurant.name }}</h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <img :src="homeRestaurant.image_url" class="img-fluid" alt="Responsive image">
                            </div>


                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { onMounted } from '@vue/runtime-core'
import { useRoute } from "vue-router"
import { yelpService } from '../services/YelpService.js'
export default {

    setup() {
        const route = useRoute()
        onMounted(async () => {
            try {
                await yelpService.getById(route.params.id)

            } catch (error) {
            }
        }) 
        return {
            activeRestaurant: computed(() => AppState.activeRestaurant),
    }
}}

</script>


<style lang="scss" scoped>
</style>