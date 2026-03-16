<script setup>
import HabitInput from '../components/habits/HabitInput.vue'
import HabitList from '../components/habits/HabitList.vue'
import BaseCard from '../components/base/BaseCard.vue'
</script>

<template>
  <div class="habits-page">
    <BaseCard>
      <header class="mb-8">
        <h1 class="text-2xl font-bold text-slate-800">Daily Habits</h1>
        <p class="text-slate-500">Consistency is the key to success.</p>
      </header>
      
      <HabitInput />
      <HabitList />
    </BaseCard>
  </div>
</template>
