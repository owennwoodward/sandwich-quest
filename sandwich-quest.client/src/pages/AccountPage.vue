<template>
  <div class="about text-center">
    <img class="rounded-pill p-3" :src="account.picture" alt="" />
    <h1>{{ account.name }}</h1>
    <h3 class="mt-4">My Quests</h3>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    const edits = ref({})
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
