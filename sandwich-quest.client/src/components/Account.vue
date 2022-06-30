<template>
    <div class="container-fluid">
        <div class="row">
            <div class="card">

            </div>
        </div>
    </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { logger } from '../utils/Logger';

export default {
    props: {},
    setup() {
        onMounted(async () => {
            try {
                AppState.quests = [];
                await questsService.getAccountQuests()
                // AppState.account
                // edits.value = { ...AppState.account }
            } catch (error) {
                logger.error(error)
            }
        })
        return {
            account: computed(() => AppState.account),
            quests: computed(() => AppState.quests),
        }
    }
}
</script>


<style lang="scss" scoped>
</style>