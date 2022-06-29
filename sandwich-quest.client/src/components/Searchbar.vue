<template>
    <form @submit.prevent="search">
        <!-- TODO icon for the searchbar -->
        <!-- TODO V-Bind all form elements -->
        <!-- TODO connect to yelp api -->
        <div class="mb-3 p-2 d-flex">
          <input v-model="searchTerm" type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="Search!">
        </div>
    </form>
</template>


<script>
import { ref } from 'vue'
import { yelpService } from '../services/YelpService'


export default {
    setup(){
        const searchTerm = ref({})
        return {
            searchTerm,
            async search() {
                let query = searchTerm.value
                console.log(query)
                await yelpService.getAll(query)
            }
        }
    }
}
</script>


<style lang="scss" scoped>

.magnify-container {
    width: 3rem;
    height: 3rem;
}

</style>