<script setup>
import { onMounted } from 'vue'
import { useSettingStore } from './store/settingStore'

const settingStore = useSettingStore()

// Sync 'dark' class with store on app startup
onMounted(() => {
  if (settingStore.darkMode) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>

<template>
  <div id="app-container" class="min-h-screen bg-slate-50">
    <router-view />
  </div>
</template>

<style>
#app {
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
