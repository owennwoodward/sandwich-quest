<template>
    <div class="component">
        <div class="container">
            <div class="row justify-content-start">
                <button class=" col-md-12 d-flex justify-content-between btn btn-primary" type="button"
                    data-bs-toggle="collapse" :data-bs-target="`#id` + quest.id" aria-expanded="false"
                    aria-controls="collapseWidthExample">
                    {{ quest.name }}
                    <i class="mdi mdi-delete text-danger"></i>
                    <!-- <div class="col-md-6 selectable justify-content-end" @click="removeQuest">
                    </div> -->
                    <!-- <div class="col-2 selectable justify-content-start" @click="editQuest">
                        <i class="mdi mdi-pencil"></i>
                    </div> -->
                </button>

                <div style="min-height: 120px;">
                    <div class="collapse collapse-horizontal m-4" :id="`id` + quest.id">
                        <div class="card card-body collapse-mobile">
                            <QuestItem v-for="i in questItems" :key="i.id" :item="i" />
                        </div>
                    </div>
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
            },

            async editQuest() {
                try {
                    await questsService.editQuest(props.quest.id)
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
.collapse-mobile {
    width: 47vw;
}

@media(max-width: 979px) {
    .collapse-mobile {
        width: 75vw;
    }
}
</style>