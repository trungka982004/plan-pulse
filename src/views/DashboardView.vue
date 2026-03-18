<script setup>
import { onMounted } from 'vue'
import { useGoalStore } from "../stores/goalStore"
import { useHabitStore } from "../stores/habitStore"
import { useJournalStore } from "../stores/journalStore"
import BaseCard from "../components/base/BaseCard.vue"
import GoalList from "../components/goals/GoalList.vue"
import HabitList from "../components/habits/HabitList.vue"

const goalStore = useGoalStore()
const habitStore = useHabitStore()
const journalStore = useJournalStore()

onMounted(() => {
  if (goalStore.loadGoals) goalStore.loadGoals()
  if (habitStore.loadHabits) habitStore.loadHabits()
  if (journalStore.loadJournals) journalStore.loadJournals()
})
</script>

<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-slate-800 dark:text-slate-100">Dashboard</h1>
      <p class="text-slate-500 dark:text-slate-400">Track your progress and stay productive.</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Goals Overview -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100">Recent Goals</h2>
          <RouterLink to="/goals" class="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">View All</RouterLink>
        </div>
        <BaseCard>
          <GoalList :limit="3" />
        </BaseCard>
      </section>

      <!-- Habits Overview -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100">Daily Habits</h2>
          <RouterLink to="/habits" class="text-sm font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300">View All</RouterLink>
        </div>
        <BaseCard>
          <HabitList :limit="3" />
        </BaseCard>
      </section>
    </div>
  </div>
</template>
