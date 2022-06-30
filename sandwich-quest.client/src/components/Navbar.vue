<template>
  <nav class="bg-primary px-3">

    <div @click="homePage()" class="d-flex justify-content-between py-2 pt-3 px-1" >
              <div>
           <i class="selectable mdi mdi-home-circle fs-1"></i>
        </div>
      <div class="selectable d-flex display-6 fw-bold flex-column justify-content-center">
        New Quest
      </div>
      <div @click="accountPage()">
        <i class="selectable mdi mdi-account-circle fs-1"></i>
      </div>
    </div>



  </nav>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter()
    return {
      homePage() {
        router.push({
          name: 'Home'
        })
      },
      accountPage() {
        router.push({
          name: 'Account'
        })
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

</style>
