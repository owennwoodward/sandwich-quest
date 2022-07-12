

<template>
    <form @submit.prevent="search">
        <!-- TODO fix focus highlighting for bar/icon-->
        
        <div class="mb-3 p-2 d-flex">
          <input v-model="searchTerm" type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="Search!">
          <button><i class="fs-1 mdi mdi-magnify"></i></button>

        </div>
    </form>
</template>


<script>
import { ref } from 'vue'
import { AppState } from '../AppState'
import { yelpService } from '../services/YelpService'
import { logger } from '../utils/Logger'

export default {
    setup(){
        const searchTerm = ref('')
        return {
            searchTerm,
            async search() {
                let query = searchTerm.value
                AppState.currentCategories = ''
                await yelpService.getAll(query)
                AppState.currentTerm = searchTerm.value
                // searchTerm.value = ''
            }
        }
    }
}
</script>


<style lang="scss" scoped>
@import "../assets/scss/variables";
.magnify-container {
    width: 3rem;
    height: 3rem;
}

input{
    background-color: $light;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-right: 0px;
}

input:focus{
        background-color: $light
}


i{
    background-color: $light;
    color: $dark;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
 }
button{
    border: 0px;
    background-color: $light;
}


</style>