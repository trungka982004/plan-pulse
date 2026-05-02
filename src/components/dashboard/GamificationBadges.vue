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
  <BaseCard class="relative overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-500 border-none text-white shadow-lg shadow-purple-500/30">
    <!-- Decorative background elements similar to Pomodoro -->
    <div class="absolute top-0 left-0 -ml-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 -mr-8 -mb-8 w-24 h-24 rounded-full bg-black opacity-10 blur-xl pointer-events-none"></div>

    <div class="relative z-10 flex flex-col h-full">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold flex items-center gap-2">
          <span>🏆</span> Achievements
        </h2>
        <span class="text-xs font-medium px-2.5 py-1 bg-white/20 rounded-full backdrop-blur-sm">
          {{ badges.length }} Unlocked
        </span>
      </div>

      <!-- Achieved Badges -->
      <div v-if="badges.length > 0" class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div 
          v-for="badge in badges" 
          :key="badge.id"
          class="flex flex-col items-center p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-sm shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 text-center group"
        >
          <div class="w-10 h-10 rounded-full flex items-center justify-center text-xl mb-2 transition-transform group-hover:rotate-12 bg-white/20">
            {{ badge.icon }}
          </div>
          <div class="font-bold text-sm text-white">{{ badge.title }}</div>
          <div class="text-[10px] text-white/70 mt-1 leading-tight">{{ badge.description }}</div>
        </div>
      </div>
      
      <div v-else class="text-center py-6 text-white/60 text-sm">
        <div class="text-3xl mb-2 opacity-50">🌱</div>
        Complete goals and maintain streaks to unlock badges!
      </div>

      <!-- Locked / Upcoming Badges -->
      <div v-if="upcomingBadges.length > 0" class="pt-4 mt-auto border-t border-white/10">
        <h3 class="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Next Targets</h3>
        <div class="flex flex-wrap gap-2">
          <div 
            v-for="(badge, index) in upcomingBadges" 
            :key="index"
            class="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-black/10 border border-white/5 text-xs text-white/70"
          >
            <svg class="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            <span class="font-medium">{{ badge.title }}</span>
            <span class="opacity-30 mx-0.5">•</span>
            <span>{{ badge.req }}</span>
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>
