<script setup>
import { storeToRefs } from "pinia"
import { useGoalStore } from "../../stores/goalStore"
import GoalItem from "./GoalItem.vue"
import GoalFilters from "./GoalFilters.vue"
import BaseProgressBar from "../base/BaseProgressBar.vue"

const goalStore = useGoalStore()
const { filteredGoals, totalCount, progress } = storeToRefs(goalStore)
</script>

<template>
  <div class="space-y-6">
    <!-- Progress Bar Section -->
    <BaseProgressBar 
      v-if="totalCount > 0"
      :progress="progress"
      label="Goal Completion Progress"
    />
    <GoalFilters />
    <!-- Goal Items List -->
    <transition-group
      v-if="filteredGoals.length > 0"
      name="list"
      tag="div"
      class="space-y-3"
    >
      <GoalItem
        v-for="goal in filteredGoals"
        :key="goal.id"
        :goal="goal"
      />
    </transition-group>

    <!-- Empty State -->
    <div 
      v-else 
      class="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200"
    >
      <p class="text-slate-500 font-medium">No goals found. Start by adding one above!</p>
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
