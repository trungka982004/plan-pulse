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
      if (authStore.profile) {
        return {
          name: authStore.profile.full_name || authStore.profile.email?.split('@')[0] || 'User',
          email: authStore.profile.email,
          avatar: authStore.profile.avatar_url || `https://i.pravatar.cc/150?u=${authStore.profile.id}`,
          bio: authStore.profile.bio || 'Self-Improvement Journey'
        }
      }
      return {
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
