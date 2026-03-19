<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSettingStore } from '../../stores/settingStore'
import { useNotificationStore } from '../../stores/notificationStore'

const route = useRoute()
const settingStore = useSettingStore()
const notiStore = useNotificationStore()

const pageTitle = computed(() => {
  const titles = {
    '/': 'Dashboard Overview',
    '/goals': 'Set Your Goals',
    '/habits': 'Daily Habits',
    '/settings': 'Application Settings',
    '/analytics': 'Advanced Analytics',
    '/journal': 'Daily Reflections'
  }
  return titles[route.path] || 'Todo App'
})

const handleClearAll = () => {
    notiStore.clearAll()
}
</script>

<template>
  <header class="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between sticky top-0 z-50 w-full transition-colors duration-300">
    <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100">{{ pageTitle }}</h2>
    
    <div class="flex items-center gap-4">
      <button @click="settingStore.toggleDarkMode()" class="p-2 text-slate-400 hover:text-sky-500 transition-colors" title="Toggle Dark Mode">
        <svg v-if="settingStore.darkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      </button>

      <!-- Notification Bell with Dropdown -->
      <div class="relative">
        <button @click="notiStore.toggleDropdown()" class="p-2 text-slate-400 hover:text-indigo-600 transition-colors relative">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <!-- Badge -->
          <span v-if="notiStore.unreadCount > 0" class="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
            {{ notiStore.unreadCount }}
          </span>
        </button>

        <!-- Dropdown Menu -->
        <div v-if="notiStore.isDropdownOpen" class="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 py-2 z-[60] overflow-hidden origin-top-right transition-all">
            <div class="px-4 py-2 border-b border-slate-50 dark:border-slate-700 flex justify-between items-center">
                <span class="font-bold text-slate-800 dark:text-slate-100">Notifications</span>
                <button @click="handleClearAll" class="text-xs text-indigo-500 hover:text-indigo-600 font-semibold">Clear All</button>
            </div>
            
            <div class="max-h-96 overflow-y-auto">
                <div v-if="notiStore.notifications.length === 0" class="p-8 text-center">
                    <div class="text-3xl mb-2 opacity-50">📭</div>
                    <p class="text-sm text-slate-400">No new notifications</p>
                </div>
                
                <div v-for="noti in notiStore.notifications" :key="noti.id" class="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer border-b border-slate-50 dark:border-slate-700/50 group last:border-0" @click="notiStore.markAsRead(noti.id)">
                    <div class="flex gap-3">
                        <div class="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" v-if="!noti.read"></div>
                        <div class="w-2 h-2 rounded-full bg-transparent mt-1.5 shrink-0" v-else></div>
                        <div class="flex-1">
                            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-500 transition-colors">{{ noti.title }}</h4>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{{ noti.message }}</p>
                            <span class="text-[10px] text-slate-400 dark:text-slate-500 mt-2 block uppercase tracking-wider">{{ noti.time }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <!-- Profile Avatar -->
      <RouterLink to="/settings" class="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-white dark:border-slate-700 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden">
        <img :src="settingStore.userProfile.avatar" class="w-full h-full object-cover" />
      </RouterLink>
    </div>
  </header>
</template>
