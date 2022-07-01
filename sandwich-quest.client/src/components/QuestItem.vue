<template>
  <div class="item-card elevation-2 py-2 my-2">
      <h6>{{item.name}}</h6>
      {{item.myNotes}}

  </div>
</template>


<script>
export default {
  props : {item: {type: Object, required: true}},
  setup(props){
    return {

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