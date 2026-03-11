<script setup>
import { useTodoStore } from "../store/todoStore"
import TodoItem from "./TodoItem.vue"
import TodoFilters from "./TodoFilters.vue"
import BaseProgressBar from "./base/BaseProgressBar.vue"

const todoStore = useTodoStore()
</script>

<template>
  <div class="space-y-6">
    <!-- Progress Bar Section -->
    <BaseProgressBar 
      v-if="todoStore.totalCount > 0"
      :progress="todoStore.progress"
      label="Completion Progress"
    />

    <!-- Stats & Filters Bar -->
    <TodoFilters />

    <!-- Todo Items List -->
    <transition-group
      v-if="todoStore.filteredTodos.length > 0"
      name="list"
      tag="div"
      class="space-y-3"
    >
      <TodoItem
        v-for="todo in todoStore.filteredTodos"
        :key="todo.id"
        :todo="todo"
      />
    </transition-group>

    <!-- Empty State -->
    <div
      v-else
      class="flex flex-col items-center justify-center py-16 px-4"
    >
      <div class="mb-4">
        <svg
          class="w-16 h-16 text-slate-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9 12l2 2m0 0l4-4m-4 4V7m0 12v0m0 0H7m0 0v-4m0 4H4m0 0v-6m0 6V7a2 2 0 012-2h6a2 2 0 012 2v6"
          />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-slate-700 mb-2">
        No tasks yet
      </h3>
      <p class="text-sm text-slate-500 text-center max-w-sm">
        Create your first task to get started. Stay productive and organized!
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Transition animations */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.3s ease;
}
</style>