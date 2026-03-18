<script setup>
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
</script>

<template>
  <div class="flex min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
    <!-- Left Navigation Bar (Sidebar) -->
    <Sidebar />
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Top Title Bar (Navbar) -->
      <Navbar />
      <!-- Main content of each page (Replaced by RouterView) -->
      <main class="flex-1 overflow-y-auto p-8">
        <div class="max-w-5xl mx-auto">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* You can add transition effects for content here if needed */
</style>