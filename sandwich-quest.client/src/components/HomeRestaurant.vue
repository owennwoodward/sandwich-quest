<template>
    <div class="container home-card mb-4">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div @click="goToRestaurantDetails" class="card-header selectable bg-success">
                        <div class="d-flex justify-content-between ">
                            <div class="display-5">{{ homeRestaurant.name }}</div>
                            <span class="m-2">{{ homeRestaurant.price }}</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="py-2 fst-italic">{{ homeRestaurant?.location?.address1 }}</div>
                            <YelpStars :rating="homeRestaurant.rating" />
                        </div>
                        <div class="d-flex justify-content-between fst-italic">

                            <b v-for="c in homeRestaurant.categories" :key="c.alias"> {{ c.title }}</b>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row ">
                            <div class="col-md-4">
                                <img :id="homeRestaurant.id + 'image'" :src="homeRestaurant.image_url"
                                    @error="changeImg" class="img-fluid rounded elevation-1">
                                <!-- @error="imgCondition = true" -->
                            </div>
                            <div class="col-md-8 my-1">
                                <div class="row text-center">
                                    <div class="col-md-6">
                                        <div><b>Phone:</b>
                                            <p>{{ homeRestaurant.phone }}</p>
                                        </div>
                                        <!-- <div v-if="homeRestaurant.transactions[0]" class="d-flex flex-column">
                                            <b>Transactions:</b>
                                            <p class="p-1 m-0 fst-italic" v-for="m in homeRestaurant.transactions">{{ m
                                            }}
                                            </p>
                                        </div> -->
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">

                                            <b>Directions:</b>
                                            <span> <a class="text-secondary" target="_blank"
                                                    :href="`https://maps.google.com/?q=${homeRestaurant.coordinates?.latitude},${homeRestaurant.coordinates?.longitude}`">
                                                    Google Maps</a></span>
                                        </div>
                                        <div class="mobile-center">
                                            <AddToQuest :restaurant="homeRestaurant" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div v-if="homeRestaurant.coordinates?.latitude" class="d-flex flex-column">
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
import { computed } from "vue"
import { useRouter } from "vue-router"
import { questsService } from "../services/QuestsService.js"
import { yelpService } from '../services/YelpService.js'
import Pop from "../utils/Pop.js"
import defaultImg from '../assets/img/SQBW.png'
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
            defaultImg,
            imgCondition: false,
            goToRestaurantDetails() {
                router.push({
                    name: 'restaurant-details',
                    params: {
                        id: props.homeRestaurant.id
                    }
                })
            },
            // method to change src tag
            changeImg() {
                document.getElementById(`${props.homeRestaurant.id}image`).src = defaultImg
            },
            // altImg: computed(() => {return document.getElementById(`${props.homeRestaurant.id}image`).getAttribute('src') ? defaultImg :props.homeRestaurant.image_url })
        }

    }
}

</script>


<style lang="scss" scoped>
.home-card {
    color: rgb(34, 32, 32);
}

// .stars {
//     display: flex;
//     flex-direction: row-reverse;
//     transform: scale(.75);
// }

@media(max-width: 768px) {
    .mobile-center {
        display: flex;
        justify-content: center;
    }
}
</style>