<script setup>
import { ref, onMounted } from 'vue'
import { useGoalStore } from '../../stores/goalStore'
import { useHabitStore } from '../../stores/habitStore'
import { useSettingStore } from '../../stores/settingStore'
import { aiService } from '../../services/aiService'
import BaseCard from '../base/BaseCard.vue'

const goalStore = useGoalStore()
const habitStore = useHabitStore()
const settingStore = useSettingStore()

const advice = ref('')
const loading = ref(false)

const getAdvice = async () => {
    loading.value = true
    try {
        advice.value = await aiService.getGoalAdvice(goalStore.goals, habitStore.habits, settingStore.userProfile)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    getAdvice()
})
</script>

<template>
  <BaseCard class="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-100 dark:border-indigo-500/30 overflow-hidden relative">
    <!-- Animated background element -->
    <div class="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
    <div class="absolute -left-10 -bottom-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
    
    <div class="flex items-start gap-4 p-1 relative z-10">
      <div class="shrink-0">
        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-2xl shadow-sm border border-indigo-100 dark:border-indigo-500/40">
          🤖
        </div>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between mb-1">
          <h3 class="text-sm font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">{{ settingStore.aiCoachName }}</h3>
          <button @click="getAdvice" :disabled="loading" class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors disabled:opacity-50 inline-flex items-center gap-1">
             <svg class="w-3 h-3" :class="{ 'animate-spin': loading }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
             Refresh
          </button>
        </div>
        <div v-if="loading" class="space-y-2 mt-2">
           <div class="h-4 bg-indigo-100 dark:bg-indigo-900/40 rounded-full w-full animate-pulse"></div>
           <div class="h-4 bg-indigo-100 dark:bg-indigo-900/40 rounded-full w-3/4 animate-pulse"></div>
        </div>
        <p v-else class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic">
          "{{ advice || 'Calculating the best path for your journey...' }}"
        </p>
      </div>
    </div>
  </BaseCard>
</template>
