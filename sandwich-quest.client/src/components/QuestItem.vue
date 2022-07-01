<template lang="">


<!--  -->
    <!-- <div class="container text-black py-3">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3>{{ homeRestaurant.name }}<small class="text-muted"> -  {{homeRestaurant.price}}</small></h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <img :src="homeRestaurant.image_url" class="img-fluid" alt="Responsive image">
                            </div>
                                <div class="col-md-8 d-flex justify-content-between p-2">
                                    <div class="" >
                                        <h4>{{ homeRestaurant.display_phone }}</h4>
                                        <div> <YelpStars class="stars" :rating="homeRestaurant.rating"/> </div>
                                    </div>

                                    <div>
                                        <AddToQuest :restaurantId="routeId" :quests="quests"/>
                                    </div>

                                </div>

                                <div>
                                    <p>{{homeRestaurant.location?.address1}}
                                    {{homeRestaurant.location?.address2}}
                                    {{homeRestaurant.location?.address3}}
                                    {{homeRestaurant.location?.city}}
                                    {{homeRestaurant.location?.state}}</p>

                                    <P v-for="c in homeRestaurant.categories" :key="c.alias"> {{c.title}}</P>
                                </div>

                                        
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <h4>{{ homeRestaurant.review_count }}</h4>
                                    </div>
                                </div>
                             
            -->
                                <!-- </div>
                        </div>
                    </div>
                </div>
            </div>
            </div> -->
            <!-- </div> -->

            <!-- TODO Beware, ye who enter here -->


<!--  -->


  <div class="card text-dark p-3 my-4 selectable">
    <HomeRestaurant :homeRestaurant="itemInfo"/>
  </div>
</template>
<script>
import { onMounted, computed } from "vue"
import { yelpService } from "../services/YelpService"
import Pop from "../utils/Pop"

export default {
  props: {
    quest: {
      type: Object, required: true
    }
  },
  setup(props) {

    const restaurantInfo = {}

    onMounted(async () => {
      try {
        restaurantInfo = await yelpService.getById(props.quest.id)
      } catch (error) {
        Pop.toast(error, 'error')
        console.error(error)
      }
    })

    return {
      itemInfo: computed(()=> restaurantInfo)
    }
  }
}
</script>
<style scoped lang="scss">
  
</style>