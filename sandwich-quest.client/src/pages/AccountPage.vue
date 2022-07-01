<template>
  <div v-if="account.id" class="container">
    <div class="d-flex justify-content-end pt-2">
      <button class="  btn btn-danger " @click="logout">Logout <i class="mdi mdi-logout">
        </i></button>
    </div>


    <div class="about text-center">
      <img class="rounded-pill p-3" :src="account.picture" alt="" />
      <h1>{{ account.name }}</h1>
      
      <form class="d-flex flex-column" action="" @submit.prevent="editAccount">
        <label for="">Account name</label>
        <input type="text" v-model="edits.name" />
        <label for="">Account picture</label>
        <input type="text" v-model="edits.picture" />
        <button class="btn btn-primary">Save</button>
      </form>

      <h3 class="mt-4">My Quests</h3>
      <div v-for="q in quests" :key="q.id" class="row card p-3 m-3 bg-primary selectable">
        <div class="col-12 text-center" @click="goToQuestDetails(q.id)">
          <h5>{{ q.name }}</h5>

        </div>

      </div>

    </div>

  </div>

  <Login v-if="!account.id" />
</template>

<script>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useRouter } from "vue-router"
import { AppState } from '../AppState'
import { router } from "../router"
import { accountService } from '../services/AccountService'
import { questsService } from '../services/QuestsService'
accountService
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  name: 'Account',
  setup() {
   const router = useRouter()
    const edits = ref({})
    watchEffect(()=>{
      edits.value = {...AppState.account}
    })
    onMounted(async () => {
      try {
        await questsService.getMyQuests()
      } catch (error) {
        console.error(error)
        Pop.toast(error, 'error')
      }
    })
    return {
      router,
      edits,
      account: computed(() => AppState.account),
      quests: computed(() => AppState.quests),
      questsItems: computed(() => AppState.questitems),
      goToQuestDetails(id) {
        router.push({
          name: 'QuestDetails', 
          params: {
            id: id
          }
        })
      },



      async editAccount() {
        try {
          edits.value._id = AppState.account.id
          logger.log('here is edited account data', edits.value)
          await accountService.editAccount(edits.value)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
