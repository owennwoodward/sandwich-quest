<template class="">
  <main class="bg-dark text-light">
    <div class="container ">
      <router-view />

    </div>
  </main>
  <footer>

    <Navbar />
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

footer {
  font-family: 'Julius Sans One', sans-serif;
}
</style>
