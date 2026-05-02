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
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-neutral-800 dark:text-neutral-100">Recent Goals</h2>
          <RouterLink to="/goals" class="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">View All</RouterLink>
        </div>
        <BaseCard>
          <GoalList :limit="3" />
        </BaseCard>
      </section>

      <!-- Habits Overview -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-neutral-800 dark:text-neutral-100">Daily Habits</h2>
          <RouterLink to="/habits" class="text-sm font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300">View All</RouterLink>
        </div>
        <BaseCard>
          <HabitList :limit="3" />
        </BaseCard>
      </section>
    </div>
  </div>
</template>
