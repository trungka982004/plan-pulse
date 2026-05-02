<script setup>
import { computed } from 'vue'
import { useGoalStore } from '../../stores/goalStore'
import { useHabitStore } from '../../stores/habitStore'
import BaseCard from '../base/BaseCard.vue'

const goalStore = useGoalStore()
const habitStore = useHabitStore()

const badges = computed(() => {
  const achieved = []
  
  // Goal Badges
  const completedGoalsCount = goalStore.goals.filter(g => g.status === 'completed').length
  if (completedGoalsCount >= 1) {
    achieved.push({ id: 'goal-1', title: 'Goal Getter', description: 'Completed your first goal', icon: '🎯', color: 'bg-blue-100 text-blue-600' })
  }
  if (completedGoalsCount >= 5) {
    achieved.push({ id: 'goal-5', title: 'Master Planner', description: 'Completed 5 goals', icon: '👑', color: 'bg-purple-100 text-purple-600' })
  }

  // Habit Badges
  const maxStreak = Math.max(...habitStore.habits.map(h => h.streak || 0), 0)
  if (maxStreak >= 3) {
    achieved.push({ id: 'habit-3', title: 'Habit Starter', description: 'Reached a 3-day streak', icon: '🌱', color: 'bg-emerald-100 text-emerald-600' })
  }
  if (maxStreak >= 7) {
    achieved.push({ id: 'habit-7', title: 'Consistency King', description: 'Reached a 7-day streak', icon: '🔥', color: 'bg-orange-100 text-orange-600' })
  }
  if (maxStreak >= 30) {
    achieved.push({ id: 'habit-30', title: 'Unstoppable', description: 'Reached a 30-day streak', icon: '⚡', color: 'bg-amber-100 text-amber-600' })
  }

  return achieved
})

const upcomingBadges = computed(() => {
  const upcoming = []
  const completedGoalsCount = goalStore.goals.filter(g => g.status === 'completed').length
  const maxStreak = Math.max(...habitStore.habits.map(h => h.streak || 0), 0)

  if (completedGoalsCount < 1) {
    upcoming.push({ title: 'Goal Getter', req: 'Complete 1 Goal' })
  } else if (completedGoalsCount < 5) {
    upcoming.push({ title: 'Master Planner', req: 'Complete 5 Goals' })
  }

  if (maxStreak < 3) {
    upcoming.push({ title: 'Habit Starter', req: 'Reach 3-day streak' })
  } else if (maxStreak < 7) {
    upcoming.push({ title: 'Consistency King', req: 'Reach 7-day streak' })
  } else if (maxStreak < 30) {
    upcoming.push({ title: 'Unstoppable', req: 'Reach 30-day streak' })
  }

  return upcoming
})
</script>

<template>
  <BaseCard class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
        <span>🏆</span> Achievements
      </h2>
      <span class="text-sm font-medium px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-600 dark:text-neutral-300">
        {{ badges.length }} Unlocked
      </span>
    </div>

    <!-- Achieved Badges -->
    <div v-if="badges.length > 0" class="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <div 
        v-for="badge in badges" 
        :key="badge.id"
        class="flex flex-col items-center p-3 rounded-xl border border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 text-center group"
      >
        <div :class="`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 transition-transform group-hover:rotate-12 ${badge.color} dark:bg-opacity-20`">
          {{ badge.icon }}
        </div>
        <div class="font-bold text-sm text-neutral-800 dark:text-neutral-200">{{ badge.title }}</div>
        <div class="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 leading-tight">{{ badge.description }}</div>
      </div>
    </div>
    
    <div v-else class="text-center py-6 text-neutral-400 text-sm">
      <div class="text-3xl mb-2 opacity-50">🌱</div>
      Complete goals and maintain streaks to unlock badges!
    </div>

    <!-- Locked / Upcoming Badges -->
    <div v-if="upcomingBadges.length > 0" class="pt-4 border-t border-neutral-100 dark:border-neutral-800">
      <h3 class="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Next Targets</h3>
      <div class="flex flex-wrap gap-2">
        <div 
          v-for="(badge, index) in upcomingBadges" 
          :key="index"
          class="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/50 dark:border-neutral-700/50 text-xs text-neutral-500 dark:text-neutral-400 grayscale opacity-70"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          <span class="font-medium">{{ badge.title }}</span>
          <span class="opacity-50 mx-0.5">•</span>
          <span>{{ badge.req }}</span>
        </div>
      </div>
    </div>
  </BaseCard>
</template>
