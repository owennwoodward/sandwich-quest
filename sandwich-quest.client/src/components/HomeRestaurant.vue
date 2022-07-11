<template>
    <div class="container home-card mb-4">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div  @click="goToRestaurantDetails" class="card-header selectable">
                        <div  class="d-flex justify-content-between ">
                            <h3>{{ homeRestaurant.name }}</h3>
                            <div class="stars">
                                <YelpStars :rating="homeRestaurant.rating" />
                            </div>
                        </div>
                        <h5>{{homeRestaurant?.location?.address1}}</h5>
                        <div class="d-flex justify-content-between">

                            <p v-for="c in homeRestaurant.categories" :key="c.alias"> {{c.title}}</p>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <img :src="homeRestaurant.image_url" class="img-fluid" :alt="homeRestaurant.name">
                            </div>
                            <div class="col-md-8">
                                <div>
                                    <div>Phone:
                                        <p>{{homeRestaurant.phone}}</p>
                                    </div>
                                    <div class="d-flex flex-column">
                                        Transactions:
                                        <p class="p-1 m-0 fst-italic" v-for="m in homeRestaurant.transactions">{{m}}</p>
                                    </div>
                                    <div v-if="homeRestaurant.coordinates?.latitude" class="d-flex flex-column">
                                        Directions:
                                        <span> <a class="text-secondary" :href="`https://maps.google.com/?q=${homeRestaurant.coordinates?.latitude},${homeRestaurant.coordinates?.longitude}`"> Google Maps</a></span>
                                    </div>
                                </div>
                                <div>
                                    <AddToQuest :restaurant="homeRestaurant" />
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
import { onMounted } from '@vue/runtime-core'
import { useRouter } from "vue-router"
import { questsService } from "../services/QuestsService.js"
import { yelpService } from '../services/YelpService.js'
import Pop from "../utils/Pop.js"
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