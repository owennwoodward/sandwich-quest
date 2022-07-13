<template>

  <div class="accordion my-2" :id="'accordion' + item.id">
    <div class="accordion-item">
      <h2 class="accordion-header" :id="'headerId' + item.id">
        <button class="accordion-button bg-success text-dark " type="button" data-bs-toggle="collapse"
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
              <h5 class="text-dark">Did you visit {{item.name}}?</h5> 
            
            <input class="mx-2 mb-1"  :checked="item.isChecked"  @click="editChecked"
                type="checkbox" name="" id="" />
            </div>
            </div>
              <div class="col-md-6">
            <div class="d-flex justify-content-center">

              <h5 class="text-dark mt-1">Delete Quest Item?</h5>
              <div @click.stop="deleteItem"
                class=" text-danger mdi mdi-delete selectable d-flex justify-content-end "></div>
            </div>
            </div>
            </div>
      </h2>
      <div :id="'id' + item.id" class="accordion-collapse collapse show" aria-labelledby="headingOne"
        data-bs-parent="#accordionExample">
        <div class="accordion-body text-dark ">
          <div class="container-fluid">
            <div class="row">

              <div class="py-2 d-flex justify-content-center">

                <YelpStars :rating="item.yelpRate" />
              </div>

              <div class="py-4 h4">
                {{ item.streetAddress.display_address[0] }},
                {{ item.streetAddress.city }}
                {{ item.streetAddress.state }}
              </div>
              <textarea class="py-3" placeholder="How was it?" @blur="editItem" v-model="item.myNotes">  </textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import { ref, watchEffect } from 'vue'
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
      editable,
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
</style>