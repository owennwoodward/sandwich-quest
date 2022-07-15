<template>
  <div v-if="account.id" class="container">
    <div class="d-flex justify-content-end pt-2">
      <button class="  btn btn-danger " @click="logout">Logout <i class="mdi mdi-logout">
        </i></button>
    </div>


    <div class="about text-center">
      <img class="rounded-pill p-3" :src="account.picture" alt="" />
      <div class="text-break">
      <h1>{{ account.name }}</h1>
</div>

      <button class="btn btn-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop"
        aria-controls="offcanvasTop">Edit Account</button>

      <div class="offcanvas offcanvas-top  bg-dark" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
        <div class="offcanvas-header">
          <h5 id="offcanvasTopLabel">Edit Account</h5>
          <i class=" mdi mdi-window-close btn-dark bg-dark text-reset selectable" data-bs-dismiss="offcanvas"
            aria-label="Close"></i>
        </div>
        <div class="offcanvas-body">

          <form class="d-flex flex-column align-items-center" action="" @submit.prevent="editAccount">
            <div class="col-md-6 d-flex flex-column">
              <div class="p-2 d-flex justify-content-around">
                <label class="ms-5" for="">Account name:</label>
                <input class="me-5" type="text" v-model="edits.name" />
              </div>
              <div class="p-2 d-flex justify-content-around">
                <label class="ms-5" for="">Account picture:</label>
                <input class="me-5" type="text" v-model="edits.picture" />
              </div>
            </div>
            <button data-bs-dismiss="offcanvas" aria-label="Save" class="btn btn-primary mt-3">Save</button>
          </form>
        </div>
      </div>




      <h3 class="mt-4 py-2">My Quests:</h3>
      <Quest v-for="q in quests" :key="q.id" :quest="q" />

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
import { AuthService } from '../services/AuthService'
import { locationService } from "../services/LocationService"
import { questItemsService } from '../services/QuestItemsService'
import { questsService } from '../services/QuestsService'
accountService
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  name: 'Account',
  setup() {
    const router = useRouter()
    const edits = ref({})
    watchEffect(() => {
      edits.value = { ...AppState.account }
    })
    onMounted(async () => {
      try {
        await questItemsService.getMyQuestItems()
        await questsService.getMyQuests()
        await locationService.getUserCoordinates()
      } catch (error) {
        console.error(error)
        // Pop.toast(error, 'error')
      }
    })
    return {
      router,
      edits,
      account: computed(() => AppState.account),
      quests: computed(() => AppState.quests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))),
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
          // logger.log('here is edited account data', edits.value)
          await accountService.editAccount(edits.value)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
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
