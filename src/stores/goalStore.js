import { defineStore } from "pinia"
import { ref, computed, watch } from 'vue'
import { storageService } from '../services/storageService'

export const useGoalStore = defineStore("goal", () => {
  // State: Sử dụng storageService để lấy dữ liệu ban đầu
  const goals = ref(storageService.getGoals())
  const filter = ref('all')

  // Getters
  const filteredGoals = computed(() => {
    if (filter.value === "active") return goals.value.filter((g) => !g.done)
    if (filter.value === "completed") return goals.value.filter((g) => g.done)
    return goals.value
  })

  const totalCount = computed(() => goals.value.length)
  const completedCount = computed(() => goals.value.filter(g => g.done).length)

  const progress = computed(() => {
    if (totalCount.value === 0) return 0
    return Math.round((completedCount.value / totalCount.value) * 100)
  })

  // Actions
  const addGoal = (text) => {
    if(text.trim()) {
      goals.value.push({
        id: Date.now(),
        text: text,
        done: false
      })
    }
  }

  const editGoal = (id, updateText) => {
    const goal = goals.value.find(g => g.id === id)
    if(goal && updateText.trim()) {
      goal.text = updateText
    }
  }

  const toggleGoal = (id) => {
    const goal = goals.value.find(g => g.id === id)
    if (goal) goal.done = !goal.done
  }

  const removeGoal = (id) => {
    goals.value = goals.value.filter(g => g.id !== id)
  }

  const clearAll = () => {
    if(confirm('Are you sure you want to clear all goals?')) {
      goals.value = []
    }
  }

  const setFilter = (newFilter) => {
    filter.value = newFilter
  }

  // Watch: Tự động lưu vào LocalStorage thông qua service khi có thay đổi
  watch(goals, (newGoals) => {
    storageService.saveGoals(newGoals)
  }, { deep: true })
  
  return {
    goals, filter,
    filteredGoals, totalCount, completedCount, progress,
    addGoal, editGoal, toggleGoal, removeGoal, clearAll, setFilter
  }
})
