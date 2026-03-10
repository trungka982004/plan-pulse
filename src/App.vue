<script setup>
import { ref, useTemplateRef } from 'vue'
import TodoItem from './components/TodoItem.vue'
import './App.css' 

const newTodo = ref('')
const todos = ref([])

function addTodo() {
  if (newTodo.value.trim() === '') return 

  todos.value.push({
    id: Date.now(),
    text: newTodo.value,
    done:false
  })

  newTodo.value = ''
}

function deletetodo(id) {
  todos.value = todos.value.filter(todo => todo.id !== id)
}

function toggleTodo(id) {
  const todo = todos.value.find(todo => todo.id === id)
  todo.done = !todo.done
}
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>📝 My Todo List</h1>
      <p class="subtitle">Stay organized and productive</p>
    </div>

    <div class="input-section">
      <input 
        v-model="newTodo" 
        placeholder="What needs to be done?" 
        @keyup.enter="addTodo"
        class="todo-input"
      />
      <button @click="addTodo" class="add-btn">Add</button>
    </div>

    <div class="stats">
      <span class="stat">Total: {{ todos.length }}</span>
      <span class="stat">Done: {{ todos.filter(t => t.done).length }}</span>
      <span class="stat">Remaining: {{ todos.filter(t => !t.done).length }}</span>
    </div>

    <ul class="todo-list">
      <TodoItem 
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @delete="deletetodo"
        @toggle="toggleTodo"
      />
      <li v-if="todos.length === 0" class="empty-state">
        No todos yet. Add one to get started! 🚀
      </li>
    </ul>
  </div>
</template>