<script setup>
import { ref } from "vue"
import { useTodoStore } from "../store/todoStore"

const todoStore = useTodoStore()
const text = ref("")

const addTodo = () => {
  if (!text.value.trim()) return
  todoStore.addTodo(text.value)
  text.value = ""
}

const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    addTodo()
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
      <button
        @click="addTodo"
        class="btn-primary px-6 whitespace-nowrap hover:shadow-lg"
      >
        Add Task
      </button>
    </div>
    <p class="text-xs text-slate-500 mt-2">
      Press Enter or click Add Task to create a new todo
    </p>
  </div>
</template>

<style scoped>
</style>