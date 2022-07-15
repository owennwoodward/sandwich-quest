<template>
    <div class="component">
        <div class="container">
            <div class="row justify-content-start">

                <button v-if="!questItems == 0"
                    :class="{ 'bg-success blur darken-27': (doneItems.length == questItems.length && questItems.length != 0) }"
                    class=" col-10 d-flex justify-content-between btn btn-primary borders corner-left" type="button"
                    data-bs-toggle="collapse" :data-bs-target="`#id` + quest.id" aria-expanded="false"
                    aria-controls="collapseWidthExample">
                    <h4 :class="{ 'text-decoration-line-through': (doneItems.length == questItems.length && questItems.length != 0) }"
                        class="">{{
                                quest.name
                        }}</h4>
                </button>


                <div :class="{ 'bg-success blur darken-27': (doneItems.length == questItems.length && questItems.length != 0) }"
                    class="col-2 text-end bg-primary borders pt-2 selectable corner-right" @click.stop="removeQuest">

                    <i v-if="(doneItems.length == questItems.length && questItems.length != 0)"
                        class="mdi mdi-check  h4 "></i>
                    <i class="mdi mdi-delete text-danger h4 "></i>


                </div>
                <div class="my-3 d-flex justify-content-center">
                    <!-- style="min-height: 120px;" -->
                    <div class="collapse collapse-horizontal  " :id="`id` + quest.id">
                        <div class="card card-body collapse-mobile d-flex bg-dark flex-column">
                            <!--  -->
                            <div v-if="questItems.length >= 1" class="progress">
                                <div :class="{ 'green': doneItems.length == questItems.length }"
                                    class="progress-bar bg-secondary" role="progressbar"
                                    :style="{ 'width': Math.floor(doneItems.length / questItems.length * 100) + '%' }"
                                    aria-valuemin="0" aria-valuemax="100">{{ Math.floor(doneItems.length /
                                            questItems.length
                                            * 100)
                                    }}%</div>
                            </div>
                            <h5 v-if="questItems == 0">You have no quest items for this quest</h5>
                            <QuestItem v-for="i in questItems" :key="i.id" :item="i" />

                            <img v-if="questItems != 0" :src="quest.map" alt="">
                           
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>


<script>
import { computed, onMounted, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { questsService } from '../services/QuestsService'
import { mapsService } from '../services/MapsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {

    props: { quest: { type: Object, required: true } },

    setup(props) {

    async function getStaticMap(id) {
            try {
                console.log('fetching map')
                await mapsService.getStaticMap(id)

            } catch (error) {
                Pop.toast(error)
                logger.error(error)
            }
        }

        watchEffect(() => {
            AppState.questitems;
            getStaticMap(props.quest.id)
        })
        return {
            getStaticMap,
            questItems: computed(() => AppState.questitems.filter(i => i.questId == props.quest.id)),

            doneItems: computed(() => AppState.questitems.filter(i => ((i.isChecked == true) && (i.questId == props.quest.id)))),

            map: computed(() => AppState.currentMap),

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
.blur {
    filter: blur();

}

.green {
    background-color: green !important;
    ;
}

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