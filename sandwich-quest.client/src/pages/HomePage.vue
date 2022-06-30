<template>

<div>
  <h1 class="logo">
    <img class="logo-img" src="../assets/img/SQ BW.png" alt="">
    Sando Quest</h1>
</div>
  <Searchbar/>
  <div class="container text-center">

    <h1 class="selectable" @click="select" value="pizza">☕</h1>
  </div>

<div v-for="r in homeRestaurants" :key="r.id" class="col-md-4 ">
  <HomeRestaurant :homeRestaurant="r"/>
</div>

</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { AppState } from '../AppState.js'
import { yelpService } from '../services/YelpService.js'
import { logger } from '../utils/Logger.js'
import Restaurant from '../components/HomeRestaurant.vue'
export default {
    name: "Home",
    setup() {
              const searchTerm = ref('')
              const getByType = (type) => {
                return yelpService.getByType(type)
              }

        onMounted(async () => {
        });
        return {
            homeRestaurants: computed(() => AppState.homeRestaurants.filter),
             searchTerm,
            async search() {
                let query = searchTerm.value
                console.log(query)
                await yelpService.getAll(query)
                searchTerm.value = ''
            },
         
        };
    },
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


.logo{
  font-family: fantasyFont;
}
.logo-img{
  width: 50px
}

@font-face{
  font-family: fantasyFont;
  src: url('../assets/img/DreamwoodDemoRegular-Zj3q.ttf');
} 


</style>
