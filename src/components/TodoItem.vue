<script setup>
import './TodoItem.css'

const props = defineProps({
  todo: Object
})

const emit = defineEmits(['delete','toggle'])
</script>

<template>
  <li class="todo-item" :class="{ 'todo-done': todo.done }">
    <div class="todo-content">
      <input
        type="checkbox"
        :checked="todo.done"
        @change="emit('toggle', todo.id)"
        class="checkbox"
      />
      <span 
        class="todo-text"
        @click="emit('toggle', todo.id)"
      >
        {{ todo.text }}
      </span>
    </div>

    <button 
      @click="emit('delete', todo.id)"
      class="delete-btn"
      title="Delete this todo"
    >
      🗑️
    </button>
  </li>
</template>

