

<template>
    <form @submit.prevent="search">
        <!-- TODO fix focus highlighting for bar/icon-->
        
        <div class="mb-3 p-2 d-flex">
          <input v-model="searchTerm" type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="Search!">
          <button class="search-corner-right"><i class="fs-1 mdi mdi-magnify"></i></button>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-light mx-2" data-bs-toggle="modal" data-bs-target="#locationModal">
      
      <span v-if="!currentLocation">Boise, ID</span> 
      <span v-else> {{currentLocation}} </span>
    </button>
            <!-- TODO have location be reflected on the button -->
            <!-- TODO reverse geocode by lat long if necessary, otherwise user typed info -->
            <!-- MODAL -->
            <!-- Shows options to re-enable location idk if possible -->
            <!-- Option to type new location in and submit -->
            <!-- close modal on finish typing location, or on close button. -->
        </div>
    </form>


    
    <!-- Modal -->
    <div class="modal fade text-dark" id="locationModal" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Change Location</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    
                    
                    
                    <h6>Current Location: <span class="fst-italic">
                        <span v-if="!currentLocation">Boise, ID</span> 
                        <span v-else> {{currentLocation}} </span>
                        </span></h6>
                    <form @submit.prevent="changeLocation">
                        <div class="mb-3">
                          <input v-model="locationQuery" type="text" class="form-control" name="UserLocation" id="UserLocation" aria-describedby="userLocation" placeholder="Location">
                          <small id="userLocation" class="form-text text-muted">Enter where you want to search.</small>
                        </div>   

                        <p>If you would like to use your GPS location to search, please enable your GPS services for this app, or reload the page if GPS is already enabled.</p>

                    <button type="submit" class="btn btn-primary mx-2 " data-bs-dismiss="modal">Save</button>
                    <button type="button" class="btn btn-info text-dark" data-bs-dismiss="modal">Close</button>
                    </form>

                </div>
            </div>
        </div>
    </div>
    
</template>


<script>
import { computed, ref } from 'vue'
import { AppState } from '../AppState'
import { yelpService } from '../services/YelpService'
import { logger } from '../utils/Logger'

export default {
    setup(){
        const locationQuery = ref('')
        const searchTerm = ref('')
        return {
            locationQuery,
            searchTerm,
            currentLocation: computed(()=> AppState.currentLocation),
            async search() {
                let query = searchTerm.value
                AppState.currentCategories = ''
                await yelpService.getAll(query)
                AppState.currentTerm = searchTerm.value
                // searchTerm.value = ''
            },
            changeLocation() {
                AppState.currentLocation = locationQuery.value
                try {
                    yelpService.getAll(searchTerm.value)
                } catch (error) {
                    console.error(error)
                }
                // console.log(AppState.currentLocation)
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

.search-corner-right {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}


</style>