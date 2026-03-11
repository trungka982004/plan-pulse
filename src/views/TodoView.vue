<script setup>
import TodoInput from "../components/TodoInput.vue"
import TodoList from "../components/TodoList.vue"
import TheHeader from "../components/base/TheHeader.vue"
import TheFooter from "../components/base/TheFooter.vue"
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <TheHeader class="justify-center align-center"/>

      <!-- Main Card -->
      <div class="card p-6 space-y-6">
        <!-- Input Section -->
        <section>
          <TodoInput />
        </section>

        <!-- Divider -->
        <div class="border-t border-slate-200"></div>

        <!-- List Section -->
        <section>
          <TodoList />
        </section>
      </div>

      <!-- Footer -->
      <TheFooter />
      
    </div>
  </div>
</template>

<style scoped>
/* Fade in animation on mount */
:deep(.card) {
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