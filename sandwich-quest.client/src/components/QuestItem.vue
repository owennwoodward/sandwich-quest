<template lang="">
  <div>
    {{quest.name}}
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