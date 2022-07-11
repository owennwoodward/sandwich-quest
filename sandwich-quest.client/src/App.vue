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

.stars {
  display: flex;
  flex-direction: row-reverse;
  transform: scale(.75);
}

body {
  padding-bottom: 80px;
}

@media (max-width: 897px) {
  body {
    padding-bottom: 60px;
  }
}
</style>
