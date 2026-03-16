import { defineStore } from "pinia"
import { ref, computed, watch } from 'vue'
import { storageService } from '../services/storageService'

export const useHabitStore = defineStore("habit", () => {
  // State
  const habits = ref(storageService.getHabits())
  const filter = ref('all')

  // Getters
  const filteredHabits = computed(() => {
    if (filter.value === "active") return habits.value.filter((h) => !h.done)
    if (filter.value === "completed") return habits.value.filter((h) => h.done)
    return habits.value
  })

  const totalCount = computed(() => habits.value.length)
  const completedCount = computed(() => habits.value.filter(h => h.done).length)

  const progress = computed(() => {
    if (totalCount.value === 0) return 0
    return Math.round((completedCount.value / totalCount.value) * 100)
  })

  // Actions
  const addHabit = (text) => {
    if(text.trim()) {
      habits.value.push({
        id: Date.now(),
        text: text,
        done: false,
        streak: 0 // Thêm thuộc tính streak riêng cho Habit
      })
    }
  }

  const editHabit = (id, updateText) => {
    const habit = habits.value.find(h => h.id === id)
    if(habit && updateText.trim()) {
      habit.text = updateText
    }
  }

  const toggleHabit = (id) => {
    const habit = habits.value.find(h => h.id === id)
    if (habit) habit.done = !habit.done
  }

  const removeHabit = (id) => {
    habits.value = habits.value.filter(h => h.id !== id)
  }

  const clearAll = () => {
    if(confirm('Are you sure you want to clear all habits?')) {
      habits.value = []
    }
  }

  const setFilter = (newFilter) => {
    filter.value = newFilter
  }

  // Watch
  watch(habits, (newHabits) => {
    storageService.saveHabits(newHabits)
  }, { deep: true })
  
  return {
    habits, filter,
    filteredHabits, totalCount, completedCount, progress,
    addHabit, editHabit, toggleHabit, removeHabit, clearAll, setFilter
  }
})
