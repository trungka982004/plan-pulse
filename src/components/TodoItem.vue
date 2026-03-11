<script setup>
import { useTodoStore } from "../store/todoStore"
import BaseButton from "./base/BaseButton.vue"
import BaseCheckBox from "./base/BaseCheckBox.vue"
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
    <BaseCheckBox 
      :checked="todo.done"
      @toggle="todoStore.toggleTodo(todo.id)"
    />

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

    <BaseButton 
      variant="danger" 
      @click="todoStore.removeTodo(todo.id)" 
      class="p-2"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
      </svg>
    </BaseButton>
  </div>
</template>

<style scoped>
</style>