<template>

  <div class="accordion my-2" :id="'accordion' + item.id">
    <div class="accordion-item">
      <h2 class="accordion-header" :id="'headerId' + item.id">
        <button class="item accordion-button bg-success collapsed text-dark " type="button" data-bs-toggle="collapse"
          :data-bs-target="'#id' + item.id" aria-expanded="true" aria-controls="collapseOne">
          <div class="container-fluid">
            <div class="row ">

            </div>
            <div class="h5">
              <div class="col-12 text-center display-5 ms-2">
                {{ item.name }}
              </div>
            </div>

          </div>
        </button>
        <div class="d-flex row justify-content-evenly">
          <div class="col-md-6">


            <div class="d-flex justify-content-center py-1">
              <h5 class="text-dark">Did you visit {{ item.name }}?</h5>
              <!-- {{ item.price }} -->
              <input class="mx-2 mb-1 mt-2" :checked="item.isChecked" @click="editChecked" type="checkbox" name=""
                id="" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex justify-content-center">

              <h5 class="text-dark mt-1">Delete Quest Item?</h5>
              <div @click.stop="deleteItem" class=" text-danger mdi mdi-delete selectable d-flex justify-content-end ">
              </div>
            </div>
          </div>
        </div>
      </h2>
      <div :id="'id' + item.id" class="accordion-collapse collapse" aria-labelledby="headingOne"
        data-bs-parent="#accordionExample">
        <div class="accordion-body text-dark ">
          <div class="container-fluid">
            <div class="row">

              <div class="py-2 d-flex justify-content-around">

                <YelpStars :rating="item.yelpRate" /><b class="fst-italic">Cost: {{ item.price }}</b>
              </div>

              <div class="pt-2 h4">
                {{ item.streetAddress.display_address[0] }},
                {{ item.streetAddress.city }}
                {{ item.streetAddress.state }}
              </div>
              <span class="py-2"> <a class="text-secondary" target="_blank"
                  :href="`https://maps.google.com/?q=${item.coordinates?.latitude},${item.coordinates?.longitude}`">
                  Google Maps</a></span>
              <div v-if="calculatedDistance" class="h5">{{ this.calculatedDistance }} miles</div>
              <textarea class="py-3" placeholder="How was it?" @blur="editItem" v-model="item.myNotes">  </textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import { computed, onMounted , ref, watchEffect } from 'vue'
import { AppState } from "../AppState"
import { questItemsService } from '../services/QuestItemsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
  props: { item: { type: Object, required: true } },
  setup(props) {
    const editable = ref({})
    watchEffect(() => {
      editable.value = { ...props.item }
    })
    return {
      // item.distance * (.000621)).toFixed(2) METERS TO MILES EQ
      editable,

      calculatedDistance: computed(() => {
        const lat1 = AppState.currentCoords.coords?.latitude
        const lat2 = props.item.coordinates.latitude
        const lon1 = AppState.currentCoords.coords?.longitude
        const lon2 = props.item.coordinates.longitude

        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const dist = R * c; // in metres

        const miles = (dist * (.000621)).toFixed(2)

        if (typeof miles != 'number') {
          return ''
        }
        
        return miles
      }),

      async deleteItem() {
        try {
          if (await Pop.confirm()) {
            await questItemsService.deleteItem(props.item.id)
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error, 'error')
        }
      },

      async editChecked() {

        try {
          await questItemsService.editChecked(props.item)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },


      async editItem() {

        try {
          await questItemsService.editItem(props.item)
          Pop.toast("Note Updated", 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
@import "../assets/scss/variables";

.item-card {
  background-color: $dark;
  color: $light
}

 .accordion-button:not(.collapsed){
    box-shadow: 0px 0px 2px 2px #6db8c9;
 }

.accordion-button.collapsed{
     box-shadow: 0px 0px 2px 2px rgba(255, 255, 255, .0)
    // box-shadow: 0px 0px 2px 2px transparent;
}

.accordion-button:not(.collapsed)::after {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
      
}

</style>