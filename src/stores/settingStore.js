import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    // Mock Data for Profile
    user: {
      name: 'Phan Thiet Trung',
      email: 'trung.phan@example.com',
      avatar: 'https://i.pravatar.cc/150?u=trung-phan', // Demo image
      bio: 'Love coding and building Todo Apps'
    },
    // System settings
    darkMode: false
  }),
  
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      // Add or remove 'dark' class on html tag for Tailwind recognition
      if (this.darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }
})
