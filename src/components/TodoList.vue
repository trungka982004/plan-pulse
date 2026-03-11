<script setup>
import { useTodoStore } from "../store/todoStore"
import TodoItem from "./TodoItem.vue"

const todoStore = useTodoStore()
</script>

<template>
  <div>
    <TodoItem
      v-for="todo in todoStore.todos"
      :key="todo.id"
      :todo="todo"
    />
  </div>
</template>