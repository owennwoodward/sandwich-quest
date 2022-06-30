<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card" @click="goToRestaurantDetails">
                    <div class="card-header">
                        <h3>{{ restaurant.name }}</h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="{{restaurant.image_url}}" class="img-fluid" alt="Responsive image">
                            </div>


                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { useRouter } from "vue-router"
export default {
    props: {
        restaurant: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const router = useRouter()
        return {
            restaurant: props.restaurant,
            goToRestaurantDetails: () => {
                router.push({
                    name: "restaurant-details",
                    params: {
                        id: props.restaurant.id
                    }
                })
            }
        }
    }
}
</script>


<style lang="scss" scoped>
</style>