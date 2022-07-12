<template>

  <div class="accordion my-2" :id="'accordion' + item.id">
    <div class="accordion-item">
      <h2 class="accordion-header" :id="'headerId' + item.id">
        <button class="accordion-button bg-success text-dark " type="button" data-bs-toggle="collapse"
          :data-bs-target="'#id' + item.id" aria-expanded="true" aria-controls="collapseOne">

          <div>
            <input class="mx-2 p-2" :checked="item.isChecked ? true : false" v-model="editable.checkBox"
              @click="editCheckbox()" type="checkbox" name="" id="" />
            <!-- v-model="editable.checkBox" @click="editItem()" -->

          </div>

          <h6 class="mx-2">{{ item.name }} </h6>
        </button>
      </h2>
      <div :id="'id' + item.id" class="accordion-collapse collapse show" aria-labelledby="headingOne"
        data-bs-parent="#accordionExample">
        <div class="accordion-body text-dark">

          <textarea :value="item.myNotes">  </textarea>

          {{ item.streetAddress.display_address[0] }},
          {{ item.streetAddress.city }}
          {{ item.streetAddress.state }}
          <YelpStars :rating="item.yelpRate" />
          <div class="d-flex ">
            <div @click.stop="deleteItem" class="mx-2 h4 text-danger mdi mdi-cancel selectable"></div>
            <p class="text-dark">Have You Been Here?</p>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import { ref } from 'vue'
import { questItemsService } from '../services/QuestItemsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
  props: { item: { type: Object, required: true } },
  setup(props) {
    const editable = ref({})
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

      async editCheckbox() {
        // console.log(editable.value.checkBox)

        props.item.isChecked = editable.value.checkBox

        try {
          questItemsService.editCheckbox(props.item)
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