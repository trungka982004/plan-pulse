<script setup>
import { onMounted } from 'vue'
import { useGoalStore } from "../stores/goalStore"
import { useHabitStore } from "../stores/habitStore"
import { useJournalStore } from "../stores/journalStore"
import BaseCard from "../components/base/BaseCard.vue"
import GoalList from "../components/goals/GoalList.vue"
import HabitList from "../components/habits/HabitList.vue"

import { useSettingStore } from "../stores/settingStore"
import AICoachCard from "../components/dashboard/AICoachCard.vue"
import PomodoroTimer from "../components/dashboard/PomodoroTimer.vue"
import GamificationBadges from "../components/dashboard/GamificationBadges.vue"
import { notificationService } from "../services/notificationService"

const goalStore = useGoalStore()
const habitStore = useHabitStore()
const journalStore = useJournalStore()
const settingStore = useSettingStore()

onMounted(async () => {
  await Promise.all([
    goalStore.fetchGoals(),
    habitStore.fetchHabits(),
    journalStore.fetchJournals()
  ])
  
  // Kiểm tra và gửi thông báo nếu cần (dựa trên thói quen và mục tiêu chưa xong)
  notificationService.checkAndNotify(goalStore.goals, habitStore.habits)
})
</script>

<template>
  <div class="space-y-8">
    <header class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold text-neutral-800 dark:text-neutral-100">Dashboard</h1>
        <p class="text-neutral-500 dark:text-neutral-400">Track your progress and stay productive.</p>
      </div>
      
      <!-- AI Goal Coach -->
      <AICoachCard v-if="settingStore.aiActive" class="w-full" />
      
      <!-- Phase 2 & Phase 3 Features (Side by Side) -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PomodoroTimer class="h-full" />
        <GamificationBadges class="h-full" />
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Goals Overview -->
      <section class="h-full">
        <BaseCard class="h-full relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 border-none text-white shadow-lg shadow-indigo-500/30 dashboard-purple-card">
          <!-- Decorative background elements -->
          <div class="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl pointer-events-none"></div>
          <div class="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-black opacity-10 blur-xl pointer-events-none"></div>
          
          <div class="relative z-10 space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-bold flex items-center gap-2">
                <span>🎯</span> Recent Goals
              </h2>
              <RouterLink to="/goals" class="text-xs font-medium px-3 py-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm text-white">View All</RouterLink>
            </div>
            <GoalList :limit="3" />
          </div>
        </BaseCard>
      </section>

      <!-- Habits Overview -->
      <section class="h-full">
        <BaseCard class="h-full relative overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-500 border-none text-white shadow-lg shadow-purple-500/30 dashboard-purple-card">
          <!-- Decorative background elements -->
          <div class="absolute top-0 left-0 -ml-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl pointer-events-none"></div>
          <div class="absolute bottom-0 right-0 -mr-8 -mb-8 w-24 h-24 rounded-full bg-black opacity-10 blur-xl pointer-events-none"></div>

          <div class="relative z-10 space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-bold flex items-center gap-2">
                <span>🌱</span> Daily Habits
              </h2>
              <RouterLink to="/habits" class="text-xs font-medium px-3 py-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm text-white">View All</RouterLink>
            </div>
            <HabitList :limit="3" />
          </div>
        </BaseCard>
      </section>
    </div>
  </div>
</template>

<style>
/* Override styles for components inside the purple dashboard cards */
.dashboard-purple-card .text-neutral-500 {
  color: rgba(255, 255, 255, 0.8) !important;
}
.dashboard-purple-card .bg-neutral-200 {
  background-color: rgba(255, 255, 255, 0.2) !important;
}
.dashboard-purple-card .bg-neutral-50 {
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}

/* Make inner items glassmorphic */
.dashboard-purple-card .goal-item, 
.dashboard-purple-card .habit-item {
  background-color: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.dashboard-purple-card .goal-item:hover, 
.dashboard-purple-card .habit-item:hover {
  background-color: rgba(255, 255, 255, 0.25) !important;
  border-color: rgba(255, 255, 255, 0.4) !important;
}

/* Force text colors inside the card to white */
.dashboard-purple-card .text-neutral-900 {
  color: #ffffff !important;
}

/* Completed items text */
.dashboard-purple-card .text-neutral-400 {
  color: rgba(255, 255, 255, 0.5) !important;
}

/* Unchecked Checkbox */
.dashboard-purple-card .border-neutral-300 {
  border-color: rgba(255, 255, 255, 0.4) !important;
}
.dashboard-purple-card .border-neutral-300:hover {
  border-color: rgba(255, 255, 255, 0.8) !important;
}
</style>
