

<template>
    <form @submit.prevent="search">
        <!-- TODO icon for the searchbar -->
        
        <div class="mb-3 p-2 d-flex">
          <input v-model="searchTerm" type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="Search!">
          <button><i class="fs-1 mdi mdi-magnify"></i></button>

        </div>
    </form>
</template>


<script>
import { ref } from 'vue'
import { yelpService } from '../services/YelpService'


export default {
    setup(){
        const searchTerm = ref('')
        return {
            searchTerm,
            async search() {
                let query = searchTerm.value
                console.log(query)
                await yelpService.getAll(query)
                searchTerm.value = ''
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