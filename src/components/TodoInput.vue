<script setup>
import { ref } from "vue"
import { useTodoStore } from "../store/todoStore"

const todoStore = useTodoStore()
const text = ref("") // Local state for the input text

const addTodo = () => {
  if (!text.value) return
  todoStore.addTodo(text.value)
  text.value = ""
}
</script>

<template>
  <div>
    <input v-model="text" placeholder="Add todo..." />
    <button @click="addTodo">Add</button>
  </div>
</template>