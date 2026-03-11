<script setup>
import TodoInput from "../components/TodoInput.vue"
import TodoList from "../components/TodoList.vue"
import TheHeader from "../components/layouts/TheHeader.vue"
import TheFooter from "../components/layouts/TheFooter.vue"
import BaseCard from "../components/base/BaseCard.vue"
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <TheHeader class="justify-center align-center"/>

      <!-- Main Card -->
      <BaseCard class="todo-card">
        <!-- Input Section -->
        <section class="mb-6">
          <TodoInput />
        </section>

        <!-- Divider -->
        <div class="border-t border-slate-200 mb-6"></div>

        <!-- List Section -->
        <section>
          <TodoList />
        </section>
      </BaseCard>

      <!-- Footer -->
      <TheFooter />
      
    </div>
  </div>
</template>

<style scoped>
/* Fade in animation on mount */
:deep(.todo-card) {
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>