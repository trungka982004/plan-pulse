<script setup>
import { storeToRefs } from "pinia"
import { useGoalStore } from "../stores/goalStore"
import { useHabitStore } from "../stores/habitStore"
import BaseCard from "../components/base/BaseCard.vue"
import GoalList from "../components/goals/GoalList.vue"
import HabitList from "../components/habits/HabitList.vue"

const goalStore = useGoalStore()
const habitStore = useHabitStore()

const { progress: goalProgress, totalCount: goalCount } = storeToRefs(goalStore)
const { progress: habitProgress, totalCount: habitCount } = storeToRefs(habitStore)
</script>

<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-slate-800">Dashboard</h1>
      <p class="text-slate-500">Track your progress and stay productive.</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Goals Overview -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-800">Recent Goals</h2>
          <RouterLink to="/goals" class="text-sm font-semibold text-indigo-600 hover:text-indigo-700">View All</RouterLink>
        </div>
        <BaseCard>
          <GoalList />
        </BaseCard>
      </section>

      <!-- Habits Overview -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-800">Daily Habits</h2>
          <RouterLink to="/habits" class="text-sm font-semibold text-amber-600 hover:text-amber-700">View All</RouterLink>
        </div>
        <BaseCard>
          <HabitList />
        </BaseCard>
      </section>
    </div>
  </div>
</template>
