<template>

<div>branding here</div>
  <Searchbar/>

<div v-for="r in homeRestaurants" :key="r.id" class="col-md-4 ">
  <homeRestaurant :homeRestaurant="r"/>
</div>

</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { AppState } from '../AppState.js'
import { yelpService } from '../services/YelpService.js'
import { logger } from '../utils/Logger.js'
export default {
  name: 'Home',
  setup(){
    onMounted(async () => {
    
    } )
    return{
      restaurants: computed(() => AppState.homeRestaurants)
    }
  }
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
