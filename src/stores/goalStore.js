import { defineStore } from "pinia"
import { ref, computed, watch } from 'vue'
import { storageService } from '../services/storageService'

export const useGoalStore = defineStore("goal", () => {
  const goals = ref(storageService.getGoals())
  const filter = ref('all')

  const loadGoals = () => {
    const data = storageService.getGoals();
    // Empty old elements and spread new data to maintain Proxy reactivity
    goals.value.splice(0, goals.value.length, ...data);
  }

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
  const addGoal = (text, category = 'Personal') => {
    if(text.trim()) {
      goals.value.push({
        id: Date.now(),
        text: text,
        done: false,
        category: category,
        milestones: [] // Task 2.1: Milestones
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

  const updateGoalsOrder = (newList) => {
    goals.value = newList
  }

  // Milestone Actions (Task 2.1)
  const addMilestone = (goalId, text) => {
    const goal = goals.value.find(g => g.id === goalId)
    if(goal && text.trim()) {
      if(!goal.milestones) goal.milestones = []
      goal.milestones.push({
        id: Date.now(),
        text: text.trim(),
        done: false
      })
    }
  }

  const editMilestone = (goalId, milestoneId, text) => {
    const goal = goals.value.find(g => g.id === goalId)
    if(goal && goal.milestones) {
      const milestone = goal.milestones.find(m => m.id === milestoneId)
      if(milestone && text.trim()) {
        milestone.text = text.trim()
      }
    }
  }

  const toggleMilestone = (goalId, milestoneId) => {
    const goal = goals.value.find(g => g.id === goalId)
    if(goal && goal.milestones) {
      const milestone = goal.milestones.find(m => m.id === milestoneId)
      if(milestone) {
        milestone.done = !milestone.done
      }
    }
  }

  const removeMilestone = (goalId, milestoneId) => {
    const goal = goals.value.find(g => g.id === goalId)
    if(goal && goal.milestones) {
      goal.milestones = goal.milestones.filter(m => m.id !== milestoneId)
    }
  }

  // Automatically sync goals to LocalStorage on change
  watch(goals, (newGoals) => {
    storageService.saveGoals(newGoals)
  }, { deep: true })
  
  return {
    goals, filter,
    filteredGoals, totalCount, completedCount, progress,
    addGoal, editGoal, toggleGoal, removeGoal, clearAll, setFilter, updateGoalsOrder,
    addMilestone, editMilestone, toggleMilestone, removeMilestone,
    loadGoals
  }
})
