<template>
  <div class="d-flex justify-content-between item-card elevation-2 py-2 my-2">
      <h6 class="mx-2">{{item.name}} </h6> <div @click.stop="deleteItem" class="mx-2 text-danger mdi mdi-cancel selectable"></div> 
      {{item.myNotes}}

  </div>
      <div class="d-flex ">
        <p class="text-dark">Have You Been Here?</p>
        <input class="mx-2 p-2" type="checkbox" name=""  id="">
        <!-- v-model="editable.checkBox" @click="editItem()" -->
      </div>
</template>


<script>
import { ref } from 'vue'
import { questItemsService } from '../services/QuestItemsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
  props : {item: {type: Object, required: true}},
  // editable: ref({}),
  setup(props){
    return {
        // editable,
        async deleteItem(){
          try {
            
            await questItemsService.deleteItem(props.item.id)
          } catch (error) {
            logger.error(error)
            Pop.toast(error, 'error')
          }
        },

        async editItem() {
          console.log(editable.value)
        }
    }
  }
}
</script>


<style lang="scss" scoped>
@import "../assets/scss/variables";

.item-card{
  background-color: $dark;
  color: $light
}


</style>