<script setup>
import HabitInput from '../components/habits/HabitInput.vue'
import HabitList from '../components/habits/HabitList.vue'
import BaseCard from '../components/base/BaseCard.vue'
</script>

<template>
  <div class="habits-page h-full">
    <BaseCard class="relative overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-500 border-none text-white shadow-lg shadow-purple-500/30 habits-purple-container min-h-full">
      <!-- Decorative background elements -->
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 rounded-full bg-black opacity-10 blur-2xl pointer-events-none"></div>
      
      <div class="relative z-10">
        <header class="mb-8">
          <h1 class="text-3xl font-bold flex items-center gap-3">
            <span>🌱</span> Daily Habits
          </h1>
          <p class="text-white/80 mt-2">Consistency is the key to success.</p>
        </header>
        
        <HabitInput />
        <HabitList />
      </div>
    </BaseCard>
  </div>
</template>

<style>
/* Override styles for components inside the purple container */
.habits-purple-container .text-neutral-500,
.habits-purple-container .text-neutral-800,
.habits-purple-container .text-neutral-900,
.habits-purple-container .text-neutral-600,
.habits-purple-container .text-neutral-400,
.habits-purple-container .text-neutral-700 {
  color: #ffffff !important;
}

/* Progress bar */
.habits-purple-container .progress-bar .text-neutral-500 {
  color: #ffffff !important;
  font-weight: 700;
}
.habits-purple-container .bg-neutral-200 {
  background-color: rgba(255, 255, 255, 0.3) !important;
}

/* Input Fields in HabitInput */
.habits-purple-container .input-field {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
  color: #ffffff !important;
  backdrop-filter: blur(8px);
}
.habits-purple-container .input-field::placeholder {
  color: rgba(255, 255, 255, 0.8) !important;
}

/* Filters container */
.habits-purple-container .bg-neutral-50 {
  background-color: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}
.habits-purple-container .bg-white {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
}
.habits-purple-container .bg-white button:not(.bg-indigo-500):not(.bg-amber-500) {
  color: #ffffff !important;
  font-weight: 600;
}
.habits-purple-container .bg-white button.bg-indigo-500,
.habits-purple-container .bg-white button.bg-amber-500 {
  background-color: rgba(255, 255, 255, 0.35) !important;
  color: #ffffff !important;
  font-weight: 700;
}
.habits-purple-container button.text-rose-500 {
  color: #ffb3b3 !important;
}
.habits-purple-container button.text-rose-500:hover {
  color: #ffcccc !important;
}

/* Habit Items glassmorphism */
.habits-purple-container .habit-item {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.habits-purple-container .habit-item:hover {
  background-color: rgba(255, 255, 255, 0.3) !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
}
.habits-purple-container .habit-item span {
  color: #ffffff !important;
}
.habits-purple-container .habit-item .text-neutral-400,
.habits-purple-container .habit-item .text-neutral-500 {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* Fix category badges or streak badges to pop more */
.habits-purple-container .habit-item span.rounded-full {
  background-color: rgba(255, 255, 255, 0.25) !important;
  border-color: rgba(255, 255, 255, 0.4) !important;
  color: #ffffff !important;
}

.habits-purple-container .habit-input {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-bottom-color: rgba(255, 255, 255, 0.6) !important;
  color: #ffffff !important;
}

/* Checkbox */
.habits-purple-container .border-neutral-300 {
  border-color: rgba(255, 255, 255, 0.6) !important;
}
.habits-purple-container .border-neutral-300:hover {
  border-color: #ffffff !important;
}
</style>
