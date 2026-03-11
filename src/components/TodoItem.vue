<script setup>
import { useTodoStore } from "../store/todoStore"

const props = defineProps({
  todo: Object
})

const todoStore = useTodoStore()
</script>

<template>
  <div
    class="flex items-center gap-3 p-4 rounded-lg bg-white border border-slate-200 hover:border-sky-400 hover:shadow-md transition-all duration-200 group"
  >
    <!-- Checkbox -->
    <div
      @click="todoStore.toggleTodo(todo.id)"
      class="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-md border-2 transition-all duration-200"
      :class="[
        todo.done
          ? 'bg-green-500 border-green-500'
          : 'border-slate-300 hover:border-sky-500 cursor-pointer'
      ]"
    >
      <svg
        v-if="todo.done"
        class="w-4 h-4 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>

    <!-- Todo Text -->
    <span
      class="flex-1 text-sm transition-all duration-200"
      :class="[
        todo.done
          ? 'line-through text-slate-400'
          : 'text-slate-900 font-medium'
      ]"
    >
      {{ todo.text }}
    </span>

    <!-- Delete Button -->
    <button
      @click="todoStore.removeTodo(todo.id)"
      class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-lg text-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
      title="Delete todo"
    >
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
</style>