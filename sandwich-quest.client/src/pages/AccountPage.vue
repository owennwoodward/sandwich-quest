<template>
  <div v-if="account.id" class="container">
    <div class="d-flex justify-content-end pt-2">
      <button class="  btn btn-danger " @click="logout">Logout <i class="mdi mdi-logout">
        </i></button>
    </div>


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
      <div v-for="q in quests" :key="q.id" class="row card p-3 m-3 bg-primary selectable">
        <div class="col-12 text-center">
          <h5>{{ q.name }}</h5>

        </div>

      </div>

    </div>

  </div>

  <Login v-if="!account.id" />
</template>

<script>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { questsService } from '../services/QuestsService'
import Pop from '../utils/Pop'
export default {
  name: 'Account',
  setup() {
    const edits = ref({})
    onMounted(async () => {
      try {
        await questsService.getMyQuests()
      } catch (error) {
        console.error(error)
        Pop.toast(error, 'error')
      }
    })
    return {
      // edits,
      account: computed(() => AppState.account),
      quests: computed(() => AppState.quests),
      questsItems: computed(() => AppState.questitems)



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
