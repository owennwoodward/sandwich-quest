<template>
    <div class="container home-card mb-4">
        <div class="row">
            <div class="col-md-12">
                <div class="card" @click="goToRestaurantDetails">
                    <div class="card-header">
                        <div class="d-flex justify-content-between">
                            <h3>{{ homeRestaurant.name }}</h3>
                            <div class="stars">
                                <YelpStars :rating="homeRestaurant.rating" />
                            </div>
                        </div>
                        <h5>{{homeRestaurant.location.address1}}</h5>
                        <div class="d-flex justify-content-between">
                            <p>
                                {{homeRestaurant.categories[0]?.title}}
                            </p>
                            <p>
                                {{homeRestaurant.categories[1]?.title}}

                            </p>
                            <p>
                                {{homeRestaurant.categories[2]?.title}}
                            </p>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <img :src="homeRestaurant.image_url" class="img-fluid" :alt="homeRestaurant.name">
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
import { useRouter } from "vue-router"
import { yelpService } from '../services/YelpService.js'
// import '../assets/img/yelpStars'
export default {
    props: {
        homeRestaurant: {
            type: Object,
            required: true
        }
    },

    setup(props) {
        const router = useRouter()        
        return {

            goToRestaurantDetails() {
                router.push({
                    name: 'restaurant-details',
                    params: {
                        id: props.homeRestaurant.id
                    }
                })
            }
        }
    }
}

</script>


<style lang="scss" scoped>

.home-card {
    color: rgb(34, 32, 32);
}

.stars {
    display: flex;
    flex-direction: row-reverse;
    transform: scale(.75);
}

</style>