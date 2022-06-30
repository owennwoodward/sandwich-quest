<template>
  <div class="about text-center">
    <img class="rounded-pill p-3" :src="account.picture" alt="" />
    <h1>{{ account.name }}</h1>
    <h3 class="mt-4">My Quests</h3>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-8">
          <form class="d-flex flex-column" action="" @submit.prevent="editAccount">
            <label for="">account name</label>
            <input type="text" v-model="edits.name" />
            <label for="">account picture</label>
            <input type="text" v-model="edits.picture" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  name: 'Account',
  setup() {
    const edits = ref({})
    return {
      edits,
      account: computed(() => AppState.account),
      async editAccount() {
        try {
          await accountService.editAccount(edits.value)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
