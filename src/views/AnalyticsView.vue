<script setup>
import { computed, onMounted } from 'vue'
import { useGoalStore } from '../stores/goalStore'
import { useHabitStore } from '../stores/habitStore'
import { useJournalStore } from '../stores/journalStore'
import BaseCard from '../components/base/BaseCard.vue'
import { Doughnut, Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement)

const goalStore = useGoalStore()
const habitStore = useHabitStore()
const journalStore = useJournalStore()

onMounted(async () => {
  await Promise.all([
    goalStore.fetchGoals(),
    habitStore.fetchHabits(),
    journalStore.fetchJournals()
  ])
})

// Stats
const totalGoals = computed(() => goalStore.totalCount)
const completedGoals = computed(() => goalStore.completedCount)
const goalProgress = computed(() => goalStore.progress)

const totalHabits = computed(() => habitStore.totalCount)
const completedHabits = computed(() => habitStore.completedCount)
const habitProgress = computed(() => habitStore.progress)

const totalEntries = computed(() => journalStore.recentEntries.length)

// Productivity Score (40% Goals, 60% Habits)
const productivityScore = computed(() => {
  const score = (goalProgress.value * 0.4) + (habitProgress.value * 0.6)
  return Math.round(score) || 0
})

// Goal Chart Data
const goalChartData = computed(() => ({
  labels: ['Completed', 'Active'],
  datasets: [{
    data: [completedGoals.value, totalGoals.value - completedGoals.value],
    backgroundColor: ['#818cf8', 'rgba(255, 255, 255, 0.1)'], // indigo-400
    borderWidth: 0,
    hoverOffset: 4
  }]
}))

const goalChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  cutout: '75%'
}

// Habit Chart Data (Last 7 Days)
const getLast7Days = () => {
    const dates = []
    const labels = []
    for(let i=6; i>=0; i--) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        dates.push(d.toISOString().split('T')[0])
        labels.push(d.toLocaleDateString('en-US', { weekday: 'short' }))
    }
    return { dates, labels }
}

const habitChartData = computed(() => {
    const { dates, labels } = getLast7Days()
    const data = dates.map(date => {
        return habitStore.habits.filter(h => h.completedDates && h.completedDates.includes(date)).length
    })
    
    return {
        labels: labels,
        datasets: [{
            label: 'Habits Completed',
            data: data,
            backgroundColor: '#34d399', // emerald-400
            borderRadius: 6,
            barThickness: 16
        }]
    }
})

const habitChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        y: { 
            beginAtZero: true, 
            ticks: { stepSize: 1, color: '#ffffff' },
            grid: { color: 'rgba(255, 255, 255, 0.15)', drawBorder: false },
            border: { display: false }
        },
        x: {
            ticks: { color: '#ffffff' },
            grid: { display: false },
            border: { display: false }
        }
    }
}
</script>

<template>
  <div class="analytics-page h-full">
    <BaseCard class="relative overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-500 border-none text-white shadow-lg shadow-purple-500/30 analytics-purple-container min-h-full">
      <!-- Decorative background elements -->
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 rounded-full bg-black opacity-10 blur-2xl pointer-events-none"></div>
      
      <div class="relative z-10 space-y-8">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 class="text-3xl font-extrabold text-white tracking-tight">Analytics Overview</h1>
            <p class="text-white/80 mt-1">Track your progress across all activities.</p>
          </div>
          
          <div class="flex items-center gap-4 bg-white/20 px-6 py-3 rounded-2xl shadow-lg shadow-amber-500/10 border border-amber-400/30 text-white backdrop-blur-md transition-all hover:bg-white/25">
            <div class="flex flex-col text-right">
              <span class="text-xs font-bold uppercase tracking-widest text-amber-200">Productivity Score</span>
              <span class="text-3xl font-black leading-none mt-1 text-amber-300">{{ productivityScore }}<span class="text-lg text-amber-200/60 opacity-80">/100</span></span>
            </div>
            <div class="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center text-2xl backdrop-blur-md text-amber-300 border border-amber-400/30">
              🔥
            </div>
          </div>
        </div>

        <!-- Stat Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Goals Stat -->
          <div class="bg-white p-6 rounded-2xl shadow-lg shadow-indigo-500/10 border border-indigo-400/30 transition-all hover:shadow-indigo-500/20 hover:border-indigo-400/50 hover:bg-white/20">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 rounded-xl bg-indigo-400/20 flex items-center justify-center text-indigo-300 border border-indigo-400/30">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <span class="text-3xl font-bold text-indigo-300">{{ goalProgress }}%</span>
            </div>
            <h3 class="text-lg font-bold text-indigo-100">Goal Progress</h3>
            <p class="text-indigo-200/70 text-sm mt-1">{{ completedGoals }} of {{ totalGoals }} completed</p>
            
            <div class="mt-4 h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
              <div class="h-full bg-indigo-400 rounded-full transition-all duration-500" :style="{ width: `${goalProgress}%` }"></div>
            </div>
          </div>

          <!-- Habits Stat -->
          <div class="bg-white p-6 rounded-2xl shadow-lg shadow-emerald-500/10 border border-emerald-400/30 transition-all hover:shadow-emerald-500/20 hover:border-emerald-400/50 hover:bg-white/20">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 rounded-xl bg-emerald-400/20 flex items-center justify-center text-emerald-300 border border-emerald-400/30">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              </div>
              <span class="text-3xl font-bold text-emerald-300">{{ habitProgress }}%</span>
            </div>
            <h3 class="text-lg font-bold text-emerald-100">Daily Habits</h3>
            <p class="text-emerald-200/70 text-sm mt-1">{{ completedHabits }} of {{ totalHabits }} checked today</p>
            
            <div class="mt-4 h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
              <div class="h-full bg-emerald-400 rounded-full transition-all duration-500" :style="{ width: `${habitProgress}%` }"></div>
            </div>
          </div>

          <!-- Journal Stat -->
          <div class="bg-white p-6 rounded-2xl shadow-lg shadow-amber-500/10 border border-amber-400/30 transition-all hover:shadow-amber-500/20 hover:border-amber-400/50 hover:bg-white/20">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-300 border border-amber-400/30">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
              </div>
              <span class="text-3xl font-bold text-amber-300">{{ totalEntries }}</span>
            </div>
            <h3 class="text-lg font-bold text-amber-100">Journal Entries</h3>
            <p class="text-amber-200/70 text-sm mt-1">Total moments reflected</p>
          </div>
        </div>

        <!-- Recent Activity Highlights & Charts -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <!-- Charts Container -->
          <div class="space-y-6">
            <div class="bg-white p-6 rounded-2xl shadow-lg shadow-indigo-500/5 border border-indigo-400/20 transition-all hover:border-indigo-400/40">
               <h2 class="text-xl font-bold text-indigo-100 mb-6 border-b border-indigo-400/20 pb-4">Goals Distribution</h2>
               <div class="h-48 relative flex justify-center items-center">
                 <Doughnut :data="goalChartData" :options="goalChartOptions" />
                 <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <span class="text-3xl font-bold text-indigo-300">{{ completedGoals }}</span>
                   <span class="text-xs font-semibold text-indigo-200 uppercase tracking-widest">Done</span>
                 </div>
               </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-lg shadow-emerald-500/5 border border-emerald-400/20 transition-all hover:border-emerald-400/40">
               <h2 class="text-xl font-bold text-emerald-100 mb-6 border-b border-emerald-400/20 pb-4">Habits This Week</h2>
               <div class="h-48">
                 <Bar :data="habitChartData" :options="habitChartOptions" />
               </div>
            </div>
          </div>

          <!-- Productivity Summary -->
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 transition-colors duration-200">
            <h2 class="text-xl font-bold text-neutral-100 mb-6 border-b border-neutral-100/20 pb-4">Productivity Summary</h2>
            
            <div class="space-y-6">
              <div class="flex gap-4 items-start p-3 rounded-xl hover:bg-indigo-400/10 transition-colors border border-transparent hover:border-indigo-400/20">
                <div class="mt-1 bg-indigo-400/20 text-indigo-300 border border-indigo-400/30 p-2 rounded-lg shadow-sm">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <h4 class="font-bold text-indigo-200">Goal Focus</h4>
                  <p class="text-neutral-300 text-sm mt-1">You have completed {{ completedGoals }} out of {{ totalGoals }} goals. Keep pushing toward your major milestones.</p>
                </div>
              </div>

              <div class="flex gap-4 items-start p-3 rounded-xl hover:bg-emerald-400/10 transition-colors border border-transparent hover:border-emerald-400/20">
                <div class="mt-1 bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 p-2 rounded-lg shadow-sm">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <h4 class="font-bold text-emerald-200">Habit Consistency</h4>
                  <p class="text-neutral-300 text-sm mt-1">Your completion rate for today's habits is {{ habitProgress }}%. Make sure to check off the remaining items!</p>
                </div>
              </div>
              
              <div class="flex gap-4 items-start p-3 rounded-xl hover:bg-amber-400/10 transition-colors border border-transparent hover:border-amber-400/20">
                <div class="mt-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 p-2 rounded-lg shadow-sm">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </div>
                <div>
                  <h4 class="font-bold text-amber-200">Mindfulness</h4>
                  <p class="text-neutral-300 text-sm mt-1">You've recorded {{ totalEntries }} reflections so far. Journaling regularly helps maintain focus and emotional balance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<style>
/* Override styles for components inside the purple container */
.analytics-purple-container .text-neutral-500,
.analytics-purple-container .text-neutral-800,
.analytics-purple-container .text-neutral-900,
.analytics-purple-container .text-neutral-600,
.analytics-purple-container .text-neutral-400,
.analytics-purple-container .text-neutral-700 {
  color: #ffffff !important;
}

/* Glassmorphism for boxes (Stat Cards, Charts, Summary) */
.analytics-purple-container .bg-white {
  background-color: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.analytics-purple-container .bg-white:hover {
  background-color: rgba(255, 255, 255, 0.25) !important;
  border-color: rgba(255, 255, 255, 0.4) !important;
}

/* Progress bar tracks */
.analytics-purple-container .bg-neutral-100 {
  background-color: rgba(255, 255, 255, 0.2) !important;
}

/* Border overrides fallback */
.analytics-purple-container .border-neutral-100,
.analytics-purple-container .border-neutral-200 {
  border-color: rgba(255, 255, 255, 0.3) !important;
}
</style>le>
