<template>
    <div class="component">
        <div class="container">
            <div class="row flex-row card p-2 m-3 bg-primary selectable justify-content-between ">
                <div class="col-5" @click="">
                    <h5>{{ quest.name }}
                    </h5>
                    <label :for="fieldId">
                        {{ label }}
                    </label>
                    <QuestItem v-for="i in questItems" :key="i.id" :item="i" />
                </div>
                <div class="col-2 selectable justify-content-start" @click="removeQuest">
                    <i class="mdi mdi-delete text-danger"></i>
                </div>
                <!-- <div class="col-5">

                    <input type="checkbox" :id="fieldId" class="font-bold cursor-pointer " />
                </div> -->

            </div>
        </div>

    </div>
</template>


<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { questsService } from '../services/QuestsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
    props: { quest: { type: Object, required: true } },
    setup(props) {
        return {
            questItems: computed(() => AppState.questitems.filter(i => i.questId == props.quest.id)),

            async removeQuest() {
                try {
                    if (await Pop.confirm()) {
                        await questsService.removeQuest(props.quest.id)
                    }
                } catch (error) {
                    Pop.toast(error)
                    logger.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
</style>