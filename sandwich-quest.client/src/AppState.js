import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  questitems: [],
  quests: [],
  homeRestaurants: [],
  activeRestaurant: {},
  currentCategories: '',
  currentTerm: '',
  currentLocation: '',
  currentCoords: {
    latitude: 0,
    longitude: 0
  }
})
