<template>
    <div class="component">
        <div class="row flex-row card p-3 m-3 bg-primary selectable justify-content-between ">
            <div class="col-4">

            </div>
            <div class="col-4" @click="">
                <h5>{{ quest.name }}
                </h5>
                <label :for="fieldId">
                    {{ label }}
                </label>
                <QuestItem v-for="i in questItems" :key="i.id" :item="i" />
            </div>
            <div class="col-4">

                <input type="checkbox" :id="fieldId" class="font-bold cursor-pointer " />
            </div>

        </div>

    </div>
</template>


<script>
import { computed } from 'vue'
import { AppState } from '../AppState'

export default {
    props: { quest: { type: Object, required: true } },
    setup(props) {
        return {
            questItems: computed(() => AppState.questitems.filter(i => i.questId == props.quest.id))
        }
    }
}
</script>


<style lang="scss" scoped>
</style>