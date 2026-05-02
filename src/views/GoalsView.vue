<script setup>
import GoalList from '../components/goals/GoalList.vue'
import GoalInput from '../components/goals/GoalInput.vue';
import BaseCard from '../components/base/BaseCard.vue';
</script>

<template>
  <div class="goals-page h-full">
    <BaseCard class="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 border-none text-white shadow-lg shadow-indigo-500/30 goals-purple-container min-h-full">
      <!-- Decorative background elements -->
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 rounded-full bg-black opacity-10 blur-2xl pointer-events-none"></div>
      
      <div class="relative z-10">
        <header class="mb-8">
          <h1 class="text-3xl font-bold flex items-center gap-3">
            <span>🎯</span> My Long-term Goals
          </h1>
          <p class="text-white/80 mt-2">Track and achieve your main objectives.</p> 
        </header>
        
        <GoalInput />
        <GoalList />
      </div>
    </BaseCard>
  </div>
</template>

<style>
/* Override styles for components inside the purple container */
.goals-purple-container .text-neutral-500,
.goals-purple-container .text-neutral-800,
.goals-purple-container .text-neutral-900,
.goals-purple-container .text-neutral-600,
.goals-purple-container .text-neutral-400,
.goals-purple-container .text-neutral-700 {
  color: #ffffff !important;
}

/* Progress bar */
.goals-purple-container .progress-bar .text-neutral-500 {
  color: #ffffff !important;
  font-weight: 700;
}
.goals-purple-container .bg-neutral-200 {
  background-color: rgba(255, 255, 255, 0.3) !important;
}

/* Input Fields in GoalInput */
.goals-purple-container .input-field {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
  color: #ffffff !important;
  backdrop-filter: blur(8px);
}
.goals-purple-container .input-field::placeholder {
  color: rgba(255, 255, 255, 0.8) !important;
}
.goals-purple-container .input-field option {
  background-color: #4f46e5;
  color: white;
}

/* Filters container */
.goals-purple-container .bg-neutral-50 {
  background-color: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}
.goals-purple-container .bg-white {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
}
.goals-purple-container .bg-white button:not(.bg-indigo-500) {
  color: #ffffff !important;
  font-weight: 600;
}
.goals-purple-container .bg-white button.bg-indigo-500 {
  background-color: rgba(255, 255, 255, 0.35) !important;
  color: #ffffff !important;
  font-weight: 700;
}
.goals-purple-container button.text-rose-500 {
  color: #ffb3b3 !important; /* Brighter red/pink for clear all */
}
.goals-purple-container button.text-rose-500:hover {
  color: #ffcccc !important;
}

/* Goal Items glassmorphism */
.goals-purple-container .goal-item {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.goals-purple-container .goal-item:hover {
  background-color: rgba(255, 255, 255, 0.3) !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
}
.goals-purple-container .goal-item span {
  color: #ffffff !important;
}
.goals-purple-container .goal-item .text-neutral-400 {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* Fix category badges to pop more */
.goals-purple-container .goal-item span.rounded-full {
  background-color: rgba(255, 255, 255, 0.25) !important;
  border-color: rgba(255, 255, 255, 0.4) !important;
  color: #ffffff !important;
}

.goals-purple-container .goal-input {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-bottom-color: rgba(255, 255, 255, 0.6) !important;
  color: #ffffff !important;
}

/* Checkbox */
.goals-purple-container .border-neutral-300 {
  border-color: rgba(255, 255, 255, 0.6) !important;
}
.goals-purple-container .border-neutral-300:hover {
  border-color: #ffffff !important;
}

/* Kanban / Milestones */
.goals-purple-container .bg-neutral-50.border-t-0 {
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}
.goals-purple-container .bg-neutral-100,
.goals-purple-container .bg-blue-50,
.goals-purple-container .bg-emerald-50 {
  background-color: rgba(255, 255, 255, 0.15) !important;
}
.goals-purple-container .kanban-card {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
}
.goals-purple-container .kanban-card span {
  color: #ffffff !important;
}
.goals-purple-container .kanban-column h4 {
  color: #ffffff !important;
}
.goals-purple-container .kanban-column h4 span {
  background-color: rgba(255, 255, 255, 0.3) !important;
  color: #ffffff !important;
}
</style>