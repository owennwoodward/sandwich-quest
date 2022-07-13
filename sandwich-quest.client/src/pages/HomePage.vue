<template>

  <div class="d-flex align-middle">
    <h1 class="logo">
      <img class="logo-img" src="../assets/img/SQBW.png" alt="">
      <div class="mt-2">
        Sando Quest
      </div>
    </h1>
  </div>
  <Searchbar @submit.prevent="filter = ''" />
  <div class="container text-center">

  </div>
  <!-- TODO give user a default message if nothing is currently showing -->

  <h5 class="ms-3">Filters:</h5>
  <div class="row">
    <div class=" p-3 pb-5 d-flex justify-content-around">
      <div class="text-center mt-1">All
        <h2 title="All" class=" mt-2 filter-button selectable" @click="sort('')">👌</h2>
      </div>
      <div class="text-center  mt-1">Coffee
        <h2 title="Coffee" class="mt-2 filter-button selectable" @click="sort('coffee')">☕</h2>
      </div>
      <!-- <div class="text-center  mb-1">American
        <h2 title="American" class="filter-button selectable" @click="sort('tradamerican')">🏈</h2>
      </div> -->
      <div class="text-center  mt-1">Burger
        <h2 title="Burgers" class="mt-2 filter-button selectable" @click="sort('burger')">🍔</h2>
      </div>

      <div class="text-center  mt-1">Vegan
        <h2 title="Vegan" class="mt-2 filter-button selectable" @click="sort('vegan')">🥦</h2>
      </div>
      <div class="text-center  mt-1">Bakery
        <h2 title="Bakeries" class="mt-2 filter-button selectable" @click="sort('bakeries')">🥐</h2>
      </div>
      <div class="text-center  mt-1">Dessert
        <h2 title="Desserts" class="mt-2 filter-button selectable" @click="sort('desserts')">🍨</h2>
      </div>
    </div>
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
import { questItemsService } from "../services/QuestItemsService.js"

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
          await questItemsService.getMyQuestItems()
        }
      } catch (error) {
        Pop.error(error)
      }
    });
    return {
      filter,
      searchTerm,
      homeRestaurants: computed(() => AppState.homeRestaurants.businesses?.filter(r => filter.value ? (r.categories[0]?.alias || r.categories[1]?.alias || r.categories[2]?.alias) == filter.value : true)),
      async sort(category) {
        AppState.currentCategories = category
        try {
          await yelpService.getAll(AppState.currentTerm)

        } catch (error) {
          Pop.toast(error, 'error')
          logger.error(error)
        }
      }
    };
  },
  components: { HomeRestaurant }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables";

.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}


.logo {
  font-family: fantasyFont;
  margin: 0;
  transform: scale(1);
  display: flex;
  align-items: center;

}

.logo-img {
  width: 4rem;
}

@font-face {
  font-family: fantasyFont;
  src: url('../assets/img/DreamwoodDemoRegular-Zj3q.ttf');
}

.filter-button {
  border: 2px;
  border-color: $secondary;
  border-style: solid;
  background-color: $secondary;
  border-radius: 50%;
  padding: 5px;

}

.filter-button:hover {
  transform: scale(1.05);
}
</style>