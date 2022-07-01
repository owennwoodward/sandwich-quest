<template lang="">
  <div class="card text-dark p-3 my-4 selectable">
    {{quest.name}}
    {{quest.myNotes}}
    {{quest.isChecked}}
  </div>
</template>
<script>
export default {
  props: {
    quest: {
      type: Object, required: true
    }
  },
  setup(props) {
    return {

    }
  }
}
</script>
<style scoped lang="scss">
  
</style>