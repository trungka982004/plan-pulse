<script setup>
import { onMounted } from 'vue'
import { useSettingStore } from './stores/settingStore'
import AppLayout from './components/layouts/AppLayout.vue'
import { RouterView } from 'vue-router'
const settingStore = useSettingStore()

// Sync 'dark' class with store on app startup
onMounted(() => {
  settingStore.loadSettings()
})
</script> 

<template>
  <div id="app-container" class="min-h-screen bg-slate-50">
    <AppLayout>
      <RouterView />
    </AppLayout>
  </div>
</template>

<style>
#app {
  width: 100%;
  margin: 0;
  padding: 0;
}
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>
