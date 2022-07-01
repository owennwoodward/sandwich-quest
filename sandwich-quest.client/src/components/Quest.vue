<template>
    <div class="component">
        <div class="row card p-3 m-3 bg-primary selectable">
            <div class="col-12 text-center" @click="">
                <h5>{{ quest.name }}</h5>
                <QuestItem v-for="i in questItems" :key="i.id" :item="i" />
            </div>

        </div>

    </div>
</template>


<script>
import { computed } from 'vue'
import { AppState } from '../AppState'

export default {
    props: {quest : {type: Object, required: true}},
    setup(props){
        return {
            questItems: computed(()=> AppState.questitems.filter(i => i.questId == props.quest.id))
        }
    }
}
</script>


<style lang="scss" scoped>

</style>