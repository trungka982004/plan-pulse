<script setup>
import { useTodoStore } from "../store/todoStore"

const props = defineProps({
  todo: Object
})

const todoStore = useTodoStore()
</script>

<template>
  <div>
    <span
      :style="{ textDecoration: todo.done ? 'line-through' : 'none' }"
      @click="todoStore.toggleTodo(todo.id)"
    >
      {{ todo.text }}
    </span>

    <button @click="todoStore.removeTodo(todo.id)">
      Delete
    </button>
  </div>
</template>