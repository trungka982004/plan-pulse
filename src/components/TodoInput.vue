<script setup>
import { ref } from "vue"
import { useTodoStore } from "../store/todoStore"
import BaseButton from "./base/BaseButton.vue"

const todoStore = useTodoStore()
const { addTodo } = todoStore
const text = ref("")

const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    addTodo(text.value)
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
        @click="addTodo(text)"
        class="px-6 whitespace-nowrap hover:shadow-lg"
      >
        Add Task
        <svg class="todo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
      </BaseButton>
    </div>
    <p class="text-xs text-slate-500 mt-2">
      Press Enter or click Add Task to create a new todo
    </p>
  </div>
</template>

<style scoped>
@reference "../assets/main.css";

.todo-icon {
  @apply w-5 h-5;
}
</style>