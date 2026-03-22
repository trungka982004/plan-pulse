<script setup>
import { ref } from "vue"
import { useHabitStore } from "../../stores/habitStore"
import BaseButton from "../base/BaseButton.vue"

const habitStore = useHabitStore()
const { addHabit } = habitStore
const text = ref("")

const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    addHabit(text.value)
    text.value = ""
  }
}
</script>

<template>
  <div class="mb-6">
    <div class="flex gap-2">
      <input
        v-model="text"
        @keydown="handleKeyDown"
        placeholder="Add a new habit..."
        type="text"
        class="input-field flex-1"
      />
      <BaseButton 
        variant="primary"
        @click="addHabit(text)"
        class="px-6 whitespace-nowrap"
      >
        <span class="text-xl">+</span>
        Add Habit
      </BaseButton>
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.input-field {
  @apply bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-sm text-slate-900 dark:text-slate-100;
}
</style>
