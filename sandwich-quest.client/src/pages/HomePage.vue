<template>

<div>branding here</div>
  <Searchbar/>
  <div class="container text-center">

  </div>

<div v-for="r in homeRestaurants" :key="r.id" class=" ">
  <HomeRestaurant :homeRestaurant="r"/>
</div>

</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { AppState } from '../AppState.js'
import { yelpService } from '../services/YelpService.js'
import { logger } from '../utils/Logger.js'
import HomeRestaurant from '../components/HomeRestaurant.vue'
export default {
    name: "Home",
    setup() {
        const searchTerm = ref("");
       
        onMounted(async () => {
        });
        return {
            searchTerm,
            async search() {
                let query = searchTerm.value;
                console.log(query);
                await yelpService.getAll(query);
                searchTerm.value = "";
            },
            homeRestaurants: computed(() => AppState.homeRestaurants.businesses),
        };
    },
    components: { HomeRestaurant }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
