<script setup>
import { ref } from "vue"
import { useGoalStore } from "../../stores/goalStore"
import BaseButton from "../base/BaseButton.vue"

const goalStore = useGoalStore()
const { addGoal } = goalStore
const text = ref("")
const category = ref("Personal")

const categories = ["Personal", "Work", "Health", "Learning", "Finance"]

const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    addGoal(text.value, category.value)
    text.value = ""
  }
}

const handleAdd = () => {
  addGoal(text.value, category.value)
  text.value = ""
}
</script>

<template>
  <div class="mb-6">
    <div class="flex flex-col sm:flex-row gap-2">
      <input
        v-model="text"
        @keydown="handleKeyDown"
        placeholder="Add a new task..."
        type="text"
        class="input-field flex-1"
      />
      <select v-model="category" class="input-field w-full sm:w-40 cursor-pointer text-slate-700 dark:text-slate-200 font-medium appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%20%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-[size:1.2rem] bg-no-repeat pr-10">
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
      <BaseButton 
        variant="primary"
        @click="handleAdd"
        class="px-6 whitespace-nowrap"
      >
        <span class="text-xl">+</span>
        Add Task
      </BaseButton>
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.input-field {
  @apply bg-white dark:bg-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm;
}
</style>