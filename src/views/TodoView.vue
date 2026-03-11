<script setup>
import TodoInput from "../components/TodoInput.vue"
import TodoList from "../components/TodoList.vue"
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="p-3 rounded-lg bg-sky-600">
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-slate-900">Task Manager</h1>
            <p class="text-sm text-slate-600">
              Stay organized and boost your productivity
            </p>
          </div>
        </div>
      </div>

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
      <div class="mt-8 text-center text-sm text-slate-500">
        <p>Made with ❤️ using Vue 3</p>
      </div>
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