<template>

  <div class="d-flex align-middle">
    <h1 class="logo">
      <img class="logo-img" src="../assets/img/SQ BW.png" alt="">
      Sando Quest
    </h1>
  </div>
  <Searchbar @submit.prevent="filter = ''" />
  <div class="container text-center">

  </div>
  <!-- TODO make the button not show up if the result would be empty array -->
  
  <h5>Filters:</h5>
  <div class="p-3 pb-5 d-flex justify-content-around">
    <h2 title="All" class="filter-button selectable" @click="filter= ''">👌</h2>
    <h2 title="Coffee" class="filter-button selectable" @click="filter= 'coffee'">☕</h2>
    <h2 title="American" class="filter-button selectable" @click="filter= 'tradamerican'">🏈</h2>
    <h2 title="Burgers" class="filter-button selectable" @click="filter= 'burger'">🍔</h2>
    <h2 title="Vegan" class="filter-button selectable" @click="filter= 'vegan'">🥦</h2>
    <h2 title="Bakeries" class="filter-button selectable" @click="filter= 'bakeries'">🥐</h2>
    <h2 title="Desserts" class="filter-button selectable" @click="filter= 'desserts'">🍨</h2>
  </div>
  <div v-for="r in homeRestaurants" :key="r.id" class=" ">
    <HomeRestaurant :homeRestaurant="r" />
  </div>

</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { AppState } from '../AppState.js'
import { yelpService } from '../services/YelpService.js'
import { logger } from '../utils/Logger.js'
import HomeRestaurant from '../components/HomeRestaurant.vue'
import Pop from '../utils/Pop.js'
import { questsService } from "../services/QuestsService.js"

export default {
    name: "Home",
    setup() {
        const searchTerm = ref("");
        const filter = ref('');
        let categories = [];
        onMounted(async () => {
          try {
             await yelpService.getAll('');  
             if (AppState.account.id) {
              await questsService.getMyQuests()
             }
          } catch (error) {
            Pop.error(error)
          }
        });
        return {
            filter,
            searchTerm,
            homeRestaurants: computed(() => AppState.homeRestaurants.businesses?.filter(r => filter.value ?  (r.categories[0]?.alias || r.categories[1]?.alias || r.categories[2]?.alias) == filter.value : true)),
        };
    },
    components: { HomeRestaurant }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables";
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

.filter-button{
  border: 2px;
  border-color: $secondary;
  border-style: solid;
  background-color: $secondary;
  border-radius: 50%;
  padding: 5px;
  
}

.filter-button:hover{
  transform: scale(1.05);
}

</style>
