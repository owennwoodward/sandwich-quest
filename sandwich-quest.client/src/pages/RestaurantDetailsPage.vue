<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3>{{ homeRestaurant.name }}</h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="{{homeRestaurant.image_url}}" class="img-fluid" alt="Responsive image">
                            </div>
                            <div class="col-md-8">
                                <div class="row">
                                    <div class="col-md-12">
                                        <h4>{{ homeRestaurant.price }}</h4>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <h4>{{ homeRestaurant.rating }}</h4>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <h4>{{ homeRestaurant.review_count }}</h4>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <h4>{{ homeRestaurant.location.display_address[0] }}</h4>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <h4>{{ homeRestaurant.location.display_address[1] }}</h4>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <h4>{{ homeRestaurant.display_phone }}</h4>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <h4>{{ homeRestaurant.categories[0].title }}</h4>
                                        <a href="{{homeRestaurant.url}}" target="_blank">{{ homeRestaurant.url }}</a>
                                    </div>
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
import { useRoute } from "vue-router"
import { AppState } from "../AppState.js"
import { yelpService } from "../services/YelpService.js"
import { logger } from "../utils/Logger.js"







export default {
    setup() {
        const route = useRoute()
        return {}
    }
}
</script>


<style lang="scss" scoped>
</style>