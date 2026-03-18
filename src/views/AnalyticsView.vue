<script setup>
import { computed } from 'vue'
import { useGoalStore } from '../stores/goalStore'
import { useHabitStore } from '../stores/habitStore'
import { useJournalStore } from '../stores/journalStore'
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

// Stats
const totalGoals = computed(() => goalStore.totalCount)
const completedGoals = computed(() => goalStore.completedCount)
const goalProgress = computed(() => goalStore.progress)

const totalHabits = computed(() => habitStore.totalCount)
const completedHabits = computed(() => habitStore.completedCount)
const habitProgress = computed(() => habitStore.progress)

const totalEntries = computed(() => journalStore.recentEntries.length)

// Goal Chart Data
const goalChartData = computed(() => ({
  labels: ['Completed', 'Active'],
  datasets: [{
    data: [completedGoals.value, totalGoals.value - completedGoals.value],
    backgroundColor: ['#6366f1', 'rgba(148, 163, 184, 0.2)'],
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
            backgroundColor: '#10b981',
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
            ticks: { stepSize: 1, color: '#94a3b8' },
            grid: { color: 'rgba(148, 163, 184, 0.1)', drawBorder: false },
            border: { display: false }
        },
        x: {
            ticks: { color: '#94a3b8' },
            grid: { display: false },
            border: { display: false }
        }
    }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex items-end justify-between">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Analytics Overview</h1>
        <p class="text-slate-500 dark:text-slate-400 mt-1">Track your progress across all activities.</p>
      </div>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Goals Stat -->
      <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-500 dark:text-indigo-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <span class="text-3xl font-bold text-slate-800 dark:text-slate-100">{{ goalProgress }}%</span>
        </div>
        <h3 class="text-lg font-bold text-slate-700 dark:text-slate-200">Goal Progress</h3>
        <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">{{ completedGoals }} of {{ totalGoals }} completed</p>
        
        <div class="mt-4 h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div class="h-full bg-indigo-500 rounded-full transition-all duration-500" :style="{ width: `${goalProgress}%` }"></div>
        </div>
      </div>

      <!-- Habits Stat -->
      <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-500 dark:text-emerald-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          </div>
          <span class="text-3xl font-bold text-slate-800 dark:text-slate-100">{{ habitProgress }}%</span>
        </div>
        <h3 class="text-lg font-bold text-slate-700 dark:text-slate-200">Daily Habits</h3>
        <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">{{ completedHabits }} of {{ totalHabits }} checked today</p>
        
        <div class="mt-4 h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div class="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full transition-all duration-500" :style="{ width: `${habitProgress}%` }"></div>
        </div>
      </div>

      <!-- Journal Stat -->
      <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-500 dark:text-amber-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          </div>
          <span class="text-3xl font-bold text-slate-800 dark:text-slate-100">{{ totalEntries }}</span>
        </div>
        <h3 class="text-lg font-bold text-slate-700 dark:text-slate-200">Journal Entries</h3>
        <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">Total moments reflected</p>
      </div>
    </div>

    <!-- Recent Activity Highlights & Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Charts Container -->
      <div class="space-y-6">
        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-200">
           <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">Goals Distribution</h2>
           <div class="h-48 relative flex justify-center items-center">
             <Doughnut :data="goalChartData" :options="goalChartOptions" />
             <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <span class="text-3xl font-bold text-slate-800 dark:text-slate-100">{{ completedGoals }}</span>
               <span class="text-xs font-semibold text-slate-500 uppercase tracking-widest">Done</span>
             </div>
           </div>
        </div>

        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-200">
           <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">Habits This Week</h2>
           <div class="h-48">
             <Bar :data="habitChartData" :options="habitChartOptions" />
           </div>
        </div>
      </div>

      <!-- Productivity Summary -->
      <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-200">
        <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">Productivity Summary</h2>
        
        <div class="space-y-6">
          <div class="flex gap-4 items-start">
            <div class="mt-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 p-2 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div>
              <h4 class="font-bold text-slate-800 dark:text-slate-100">Goal Focus</h4>
              <p class="text-slate-600 dark:text-slate-400 text-sm mt-1">You have completed {{ completedGoals }} out of {{ totalGoals }} goals. Keep pushing toward your major milestones.</p>
            </div>
          </div>

          <div class="flex gap-4 items-start">
            <div class="mt-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 p-2 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div>
              <h4 class="font-bold text-slate-800 dark:text-slate-100">Habit Consistency</h4>
              <p class="text-slate-600 dark:text-slate-400 text-sm mt-1">Your completion rate for today's habits is {{ habitProgress }}%. Make sure to check off the remaining items!</p>
            </div>
          </div>
          
          <div class="flex gap-4 items-start">
            <div class="mt-1 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 p-2 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            </div>
            <div>
              <h4 class="font-bold text-slate-800 dark:text-slate-100">Mindfulness</h4>
              <p class="text-slate-600 dark:text-slate-400 text-sm mt-1">You've recorded {{ totalEntries }} reflections so far. Journaling regularly helps maintain focus and emotional balance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../assets/main.css";
</style>
