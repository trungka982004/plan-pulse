<script setup>
import { storeToRefs } from "pinia"
import { useHabitStore } from "../../stores/habitStore"
import habitItem from "./HabitItem.vue"
import habitFilters from "./HabitFilters.vue"
import BaseProgressBar from "../base/BaseProgressBar.vue"

const habitStore = useHabitStore()
const { filteredHabits, totalCount, progress } = storeToRefs(habitStore)
</script>

<template>
  <div class="space-y-6">
    <!-- Progress Bar Section -->
    <BaseProgressBar 
      v-if="totalCount > 0"
      :progress="progress"
      label="habit Completion Progress"
    />
    <habitFilters />
    <!-- habit Items List -->
    <transition-group
      v-if="filteredHabits.length > 0"
      name="list"
      tag="div"
      class="space-y-3"
    >
      <habitItem
        v-for="habit in filteredHabits"
        :key="habit.id"
        :habit="habit"
      />
    </transition-group>

    <!-- Empty State -->
    <div 
      v-else 
      class="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200"
    >
      <p class="text-slate-500 font-medium">No habits found. Start by adding one above!</p>
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
