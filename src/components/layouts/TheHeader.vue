<!-- src/components/layouts/TheHeader.vue -->
<template>
  <div class="mb-8">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <!-- Logo & Title -->
      <div class="flex items-center gap-3">
        <div class="p-3 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/30">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <div>
          <!-- Changed to text-slate-900 so text is always dark/clear in light mode -->
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Task Manager</h1>
          <p class="text-xs text-slate-500 dark:text-slate-400">Boost your productivity</p>
        </div>
      </div>

      <!-- Navigation: clearer bg-slate-100 in light mode -->
      <nav class="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shadow-inner">
        <router-link
          to="/"
          class="px-4 py-2 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-400 transition-all"
          active-class="!bg-white dark:!bg-slate-700 !text-indigo-600 dark:!text-white shadow-sm"
        >
          Tasks
        </router-link>
        <router-link
          to="/settings"
          class="px-4 py-2 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-400 transition-all"
          active-class="!bg-white dark:!bg-slate-700 !text-indigo-600 dark:!text-white shadow-sm"
        >
          Settings
        </router-link>
      </nav>
    </div>
  </div>
</template>
