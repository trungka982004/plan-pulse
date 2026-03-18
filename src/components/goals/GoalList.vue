<script setup>
import { storeToRefs } from "pinia"
import { useGoalStore } from "../../stores/goalStore"
import GoalItem from "./GoalItem.vue"
import GoalFilters from "./GoalFilters.vue"
import BaseProgressBar from "../base/BaseProgressBar.vue"

const props = defineProps({
  limit: {
    type: Number,
    default: 0
  }
})

import draggable from "vuedraggable"
import { computed } from "vue"

const goalStore = useGoalStore()
const { filteredGoals, totalCount, progress, filter } = storeToRefs(goalStore)

const draggableGoals = computed({
  get: () => props.limit ? filteredGoals.value.slice(0, props.limit) : filteredGoals.value,
  set: (val) => {
    // Only allow drag update if we are not limited and viewing 'all'
    if (!props.limit && filter.value === 'all') {
      goalStore.updateGoalsOrder(val)
    }
  }
})
</script>

<template>
  <div class="space-y-6">
    <!-- Progress Bar Section -->
    <BaseProgressBar 
      v-if="totalCount > 0"
      :progress="progress"
      label="Goal Completion Progress"
    />
    <GoalFilters v-if="!limit" />
    <!-- Goal Items List -->
    <draggable
      v-if="draggableGoals.length > 0"
      v-model="draggableGoals"
      item-key="id"
      class="space-y-3"
      handle=".drag-handle"
      ghost-class="opacity-50"
      animation="200"
    >
      <template #item="{element}">
        <GoalItem
          :key="element.id"
          :goal="element"
        />
      </template>
    </draggable>

    <!-- Empty State -->
    <div 
      v-else 
      class="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 transition-colors duration-200"
    >
      <p class="text-slate-500 dark:text-slate-400 font-medium">No goals found. Start by adding one above!</p>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
