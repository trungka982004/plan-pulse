<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageTitle = computed(() => {
  const titles = {
    '/': 'Dashboard Overview',
    '/goals': 'Set Your Goals',
    '/habits': 'Daily Habits',
    '/settings': 'Application Settings'
  }
  return titles[route.path] || 'Todo App'
})
</script>

<template>
  <header class="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10 w-full">
    <h2 class="text-lg font-bold text-slate-800">{{ pageTitle }}</h2>
    
    <div class="flex items-center gap-4">
      <button class="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>
      <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-white shadow-sm ring-1 ring-slate-200"></div>
    </div>
  </header>
</template>
