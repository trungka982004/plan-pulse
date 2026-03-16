<script setup>
import { ref } from "vue"
import { useGoalStore } from "../../stores/goalStore"
import BaseButton from "../base/BaseButton.vue"

const goalStore = useGoalStore()
const { addGoal } = goalStore
const text = ref("")

const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    addGoal(text.value)
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
        placeholder="Add a new task..."
        type="text"
        class="input-field flex-1"
      />
      <BaseButton 
        variant="primary"
        @click="addGoal(text)"
        class="px-6 whitespace-nowrap hover:shadow-lg"
      >
        Add Task
      </BaseButton>
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.input-field {
  @apply bg-white border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm;
}
</style>