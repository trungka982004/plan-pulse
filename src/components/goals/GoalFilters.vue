<script setup>
import { storeToRefs } from "pinia"
import { useGoalStore } from "../../stores/goalStore"

const goalStore = useGoalStore()
const { filter, completedCount, totalCount } = storeToRefs(goalStore)
const { setFilter, clearAll } = goalStore
</script>

<template>
  <div
    v-if="totalCount > 0"
    class="flex flex-col sm:flex-row justify-between items-center bg-slate-50 p-2 rounded-lg gap-4 border border-slate-100"
  >
    <!-- Filter Buttons -->
    <div class="flex bg-white p-1 rounded-md shadow-sm border border-slate-200">
      <button 
        v-for="f in ['all', 'active', 'completed']"
        :key="f"
        @click="setFilter(f)"
        class="px-3 py-1 text-xs font-medium rounded transition-all capitalize"
        :class="[
          filter === f 
            ? 'bg-indigo-500 text-white shadow-sm'
            : 'text-slate-600 hover:text-indigo-600'
        ]"
      >
        {{ f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Completed' }}
      </button>
    </div>

    <!-- Action & Info -->
    <div class="flex items-center gap-4 text-sm">
      <span class="text-slate-500 font-medium">
        {{ completedCount }}/{{ totalCount }} completed
      </span>
      
      <button 
        v-if="totalCount > 0"
        @click="clearAll"
        class="text-xs text-rose-500 hover:text-rose-600 font-semibold transition-colors flex items-center gap-1"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
        Clear All
      </button>
    </div>
  </div>
</template>
