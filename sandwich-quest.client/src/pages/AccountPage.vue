<template>
  <div class="container">
    <div class="about text-center">
      <img class="rounded-pill p-3" :src="account.picture" alt="" />
      <h1>{{ account.name }}</h1>
      <!-- <form class="d-flex flex-column" action="" @submit.prevent="editAccount">
        <label for="">account name</label>
        <input type="text" v-model="edits.name" />
        <label for="">account picture</label>
        <input type="text" v-model="edits.picture" />
        <button class="btn btn-primary">save</button>
      </form> -->
      <h3 class="mt-4">My Quests</h3>
      <div v-for="q in quests" :key="q.id" class="row  card p-3 m-3 bg-primary">
        <div class="col-12 text-center">
          {{ q.name }}
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { questsService } from '../services/QuestsService'
export default {
  name: 'Account',
  setup() {
    const edits = ref({})
    onMounted(async () => {
      try {
        AppState.quests = [];
        await questsService.getMyQuests()
        // AppState.account
        // edits.value = { ...AppState.account }
      } catch (error) {
        next(error)
      }
    })
    return {
      // edits,
      account: computed(() => AppState.account),
      quests: computed(() => AppState.quests),



      // async editAccount() {
      //   try {
      //     await accountService.editAccount(edits.value)
      //   } catch (error) {
      //     logger.error(error)
      //     Pop.toast(error.message, 'error')
      //   }
      // }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
