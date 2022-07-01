<template>
    <div class="component">
        <div class="row card p-3 m-3 bg-primary selectable">
            <div class="col-12 text-center" @click="">
                <h5>{{ quest.name }}</h5>

            </div>

        </div>

    </div>
</template>


<script>
import { computed } from 'vue'
import { AppState } from '../AppState'

export default {
    props: {quest : {type: Object, required: true}},
    setup(){
        return {
            questItems: computed(()=> AppState.questitems)
        }
    }
}
</script>


<style lang="scss" scoped>

</style>