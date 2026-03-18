<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSettingStore } from '../../stores/settingStore'

const route = useRoute()
const settingStore = useSettingStore()
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
  <header class="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between sticky top-0 z-10 w-full transition-colors duration-300">
    <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100">{{ pageTitle }}</h2>
    
    <div class="flex items-center gap-4">
      <button @click="settingStore.toggleDarkMode()" class="p-2 text-slate-400 hover:text-sky-500 transition-colors" title="Toggle Dark Mode">
        <svg v-if="settingStore.darkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      </button>

      <button class="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>
      <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-white shadow-sm ring-1 ring-slate-200"></div>
    </div>
  </header>
</template>
