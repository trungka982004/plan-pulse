import { defineStore } from 'pinia'
import { useAuthStore } from './authStore'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    // AI Goal Coach settings
    aiActive: false,
    aiModel: 'Gemini', // Default to Gemini
    aiCoachName: 'Antigravity AI',
    
    // System settings
    darkMode: false,
    notificationsEnabled: true
  }),
  
  getters: {
    userProfile: () => {
      const authStore = useAuthStore()
      return authStore.user ? {
        name: authStore.user.user_metadata?.full_name || authStore.user.email.split('@')[0],
        email: authStore.user.email,
        avatar: authStore.user.user_metadata?.avatar_url || `https://i.pravatar.cc/150?u=${authStore.user.id}`,
        bio: 'Self-Improvement Journey'
      } : {
        name: 'Guest User',
        email: '',
        avatar: 'https://i.pravatar.cc/150?u=guest',
        bio: 'Please login to track progress'
      }
    }
  },
  
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      if (this.darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    
    toggleAIActive() {
      this.aiActive = !this.aiActive
    },
    
    updateAISettings(updates) {
      Object.assign(this.$state, updates)
    }
  }
})
