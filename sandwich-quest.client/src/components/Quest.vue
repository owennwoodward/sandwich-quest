<template>
    <div class="component">
        <div class="container">
            <div class="row justify-content-start">
                <button v-if="!questItems == 0"
                    class=" col-10 d-flex justify-content-between btn btn-primary borders corner-left" type="button"
                    data-bs-toggle="collapse" :data-bs-target="`#id` + quest.id" aria-expanded="false"
                    aria-controls="collapseWidthExample">
                    <h4 class="">{{ quest.name }}</h4>

                    <!-- <div class="col-md-6 selectable justify-content-end">
                        </div> -->
                    <!-- <div class="col-2 selectable justify-content-start" @click="editQuest">
                        <i class="mdi mdi-pencil"></i>
                    </div> -->
                </button>

                <div class="col-2 text-end bg-primary borders pt-2 selectable corner-right" @click.stop="removeQuest">

                    <i class="mdi mdi-delete text-danger h4 "></i>
                </div>
                <div class="my-3 d-flex justify-content-center">
                    <!-- style="min-height: 120px;" -->
                    <div class="collapse collapse-horizontal  " :id="`id` + quest.id">
                        <div class="card card-body collapse-mobile d-flex bg-dark flex-column">
                            <!--  -->
                            <div v-if="questItems.length >= 1" class="progress">
                                <div class="progress-bar bg-secondary" role="progressbar"
                                    :style="{ 'width': Math.floor(doneItems.length / questItems.length * 100) + '%' }"
                                    aria-valuemin="0" aria-valuemax="100">{{ Math.floor(doneItems.length /
                                            questItems.length
                                            * 100)
                                    }}%</div>
                            </div>
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

            doneItems: computed(() => AppState.questitems.filter(i => ((i.isChecked == true) && (i.questId == props.quest.id)))),

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

@media(max-width: 768px) {
    .collapse-mobile {
        width: 75vw;
    }
}

.borders {
    border-radius: 0%;
}

.corner-left {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

.corner-right {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
</style>