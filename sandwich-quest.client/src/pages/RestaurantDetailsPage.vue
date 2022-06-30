<template>
    <div class="container text-black py-3">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3>{{ homeRestaurant.name }}</h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <img :src="homeRestaurant.image_url" class="img-fluid" alt="Responsive image">
                            </div>
                                <div class="col-md-8">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <h4>{{ homeRestaurant.display_phone }}</h4>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <h4>Rating: {{ homeRestaurant.rating }}/5</h4>
                                    </div>
                                        <!-- 
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <h4>{{ homeRestaurant.review_count }}</h4>
                                    </div>
                                </div>
                             
            -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>

</template>


<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from "vue-router"
import { AppState } from "../AppState.js"
import { yelpService } from "../services/YelpService.js"
import { logger } from "../utils/Logger.js"
export default {
    setup() {
        const route = useRoute()

        onMounted(() => {
            try {
              yelpService.getById(route.params.id)
            } catch (error) {
              logger.error(error)
              Pop.toast(error.message, 'error')
            }
        })
        return {
            homeRestaurant:computed(()=> AppState.activeRestaurant)

        }
    }
}
</script>


<style lang="scss" scoped>
</style>