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
import { useRouter } from "vue-router"
import { yelpService } from '../services/YelpService.js'
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
</style>