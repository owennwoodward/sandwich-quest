<template>
  <nav class="bg-primary px-3 fixed-bottom nav-bar">

    <div class="d-flex justify-content-between py-2 pt-3 px-1">
      <div @click="homePage()">
        <i class="selectable mdi mdi-home-circle fs-1"></i>
      </div>
      <div class="selectable d-flex display-6 fw-bold flex-column justify-content-center p-1" data-bs-toggle="modal"
        data-bs-target="#navBar">
        New Quest
      </div>
      <div @click="accountPage()">
        <i class="selectable mdi mdi-account-circle fs-1"></i>
      </div>
    </div>




  </nav>

  <!-- Button trigger modal -->

  <!-- Modal -->
  <div class="modal fade" id="navBar" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title ">Create A New Quest</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body modal-font">
          <div class="container-fluid">

            <form v-if="isLoggedIn" @submit.prevent="createQuest">


              <div class="mb-3">
                  <input v-model="form.name" type="text" required class="form-control" name="questName" id="questName"
                  aria-describedby="helpId" placeholder="Name Your Quest">
                 
              </div>

              <p>This is where you start your quest to try new things and enjoy food and drink!</p>
              <p>You will be able to add restaurants and other noshing spots to your list after creation!</p>

              <div class="d-flex flex-row-reverse">
                <button class="btn btn-primary" type="submit">Create</button>

              </div>

            </form>

            <div v-if="!isLoggedIn">
              Please Log In to create a Quest!
            </div>



          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import { computed, ref } from "vue";
import { useRouter } from 'vue-router';
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { questsService } from '../services/QuestsService'
import { Modal } from "bootstrap";

export default {
  setup() {
    const router = useRouter();
    const form = ref({});
    return {
      form,
      isLoggedIn: computed(() => {
        if (AppState.account.id != undefined) { return true }
        return false
      }),
      homePage() {
        router.push({
          name: 'Home'
        })
      },
      accountPage() {
        router.push({
          path: '/account'
        })
      },
     checkEmpty(){
      if (!form.value){
            Pop.toast('You must enter a name for a quest', 'error')
          }
     },
     async createQuest() {
        try {
          Modal.getOrCreateInstance(document.getElementById('navBar')).hide()
          let questData = form.value
          
          let newQuest = await questsService.createQuest(questData)
          Pop.toast('Quest Created!', 'success')
          // router.push({ name: 'Account' })
          form.value = {}

        } catch (error) {
          console.error(error)
          Pop.toast(error, 'error')
        }
      }
    };
  },
};
</script>



<style scoped>
.d-flex div i {
  width: 3rem;
  height: 3rem;
}

a:hover {
  text-decoration: none;
}

.modal-font {
  font-family: 'Courier New', Courier, monospace;
}

/* .nav-bar {
  height: 5vh;
} */
</style>
