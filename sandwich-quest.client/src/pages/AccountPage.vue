<template>
  <div class="container">
    <div class="about text-center">
      <img class="rounded-pill p-3" :src="account.picture" alt="" />
      <h1>{{ account.name }}</h1>
      <form class="d-flex flex-column" action="" @submit.prevent="editAccount">
        <label for="">account name</label>
        <input type="text" v-model="edits.name" />
        <label for="">account picture</label>
        <input type="text" v-model="edits.picture" />
        <button class="btn btn-primary">save</button>
      </form>
      <h3 class="mt-4">My Quests</h3>
      {{ quests }}
      <div class="row justify-content-center">
        <div class="col-8">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  name: 'Account',
  setup() {
    const edits = ref({})
    watchEffect(() => {
      AppState.account
      edits.value = { ...AppState.account }
    })
    return {
      edits,
      account: computed(() => AppState.account),
      quests: computed(() => AppState.quests),


      async getQuests{

    }
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
