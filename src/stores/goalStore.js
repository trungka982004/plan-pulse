import { defineStore } from "pinia"
import { ref, computed } from 'vue'
import { supabase } from '../services/supabase'
import { useAuthStore } from './authStore'

export const useGoalStore = defineStore("goal", () => {
  const goals = ref([])
  const filter = ref('all')
  const loading = ref(false)
  const authStore = useAuthStore()

  // Fetch all goals for the current user
  const fetchGoals = async () => {
    if (!authStore.user) return
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('goals')
        .select(`
          *,
          milestones (*)
        `)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      goals.value = data || []
    } catch (err) {
      console.error('Error fetching goals:', err.message)
    } finally {
      loading.value = false
    }
  }

  // Getters
  const filteredGoals = computed(() => {
    if (filter.value === "active") return goals.value.filter((g) => g.status !== 'completed')
    if (filter.value === "completed") return goals.value.filter((g) => g.status === 'completed')
    return goals.value
  })

  const totalCount = computed(() => goals.value.length)
  const completedCount = computed(() => goals.value.filter(g => g.status === 'completed').length)

  const progress = computed(() => {
    if (totalCount.value === 0) return 0
    return Math.round((completedCount.value / totalCount.value) * 100)
  })

  // Actions
  const addGoal = async (title, description = '', deadline = null, category = 'Personal') => {
    if (!authStore.user) return
    try {
      const { data, error } = await supabase
        .from('goals')
        .insert([{
          user_id: authStore.user.id,
          title,
          description,
          deadline,
          category,
          status: 'pending'
        }])
        .select()
      
      if (error) throw error
      if (data) {
        goals.value.unshift({ ...data[0], milestones: [] })
      }
    } catch (err) {
      console.error('Error adding goal:', err.message)
    }
  }

  const editGoal = async (id, updates) => {
    try {
      const { error } = await supabase
        .from('goals')
        .update(updates)
        .eq('id', id)
      
      if (error) throw error
      const index = goals.value.findIndex(g => g.id === id)
      if (index !== -1) {
        goals.value[index] = { ...goals.value[index], ...updates }
      }
    } catch (err) {
      console.error('Error editing goal:', err.message)
    }
  }

  const toggleGoal = async (id) => {
    const goal = goals.value.find(g => g.id === id)
    if (!goal) return
    const newStatus = goal.status === 'completed' ? 'pending' : 'completed'
    await editGoal(id, { status: newStatus })
  }

  const removeGoal = async (id) => {
    try {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      goals.value = goals.value.filter(g => g.id !== id)
    } catch (err) {
      console.error('Error removing goal:', err.message)
    }
  }

  const addMilestone = async (goalId, title) => {
    try {
      const { data, error } = await supabase
        .from('milestones')
        .insert([{ goal_id: goalId, title, status: 'pending' }])
        .select()
      
      if (error) throw error
      const goal = goals.value.find(g => g.id === goalId)
      if (goal && data) {
        if (!goal.milestones) goal.milestones = []
        goal.milestones.push(data[0])
      }
    } catch (err) {
      console.error('Error adding milestone:', err.message)
    }
  }

  const updateMilestoneStatus = async (goalId, milestoneId, newStatus) => {
    const goal = goals.value.find(g => g.id === goalId)
    if (!goal || !goal.milestones) return
    const milestone = goal.milestones.find(m => m.id === milestoneId)
    if (!milestone) return

    try {
      const { error } = await supabase
        .from('milestones')
        .update({ status: newStatus })
        .eq('id', milestoneId)
      
      if (error) throw error
      milestone.status = newStatus
    } catch (err) {
      console.error('Error updating milestone status:', err.message)
    }
  }

  const toggleMilestone = async (goalId, milestoneId) => {
    const goal = goals.value.find(g => g.id === goalId)
    if (!goal || !goal.milestones) return
    const milestone = goal.milestones.find(m => m.id === milestoneId)
    if (!milestone) return

    const newStatus = milestone.status === 'completed' ? 'pending' : 'completed'
    await updateMilestoneStatus(goalId, milestoneId, newStatus)
  }

  const removeMilestone = async (goalId, milestoneId) => {
    try {
      const { error } = await supabase
        .from('milestones')
        .delete()
        .eq('id', milestoneId)
      
      if (error) throw error
      const goal = goals.value.find(g => g.id === goalId)
      if (goal) {
        goal.milestones = goal.milestones.filter(m => m.id !== milestoneId)
      }
    } catch (err) {
      console.error('Error removing milestone:', err.message)
    }
  }

  const setFilter = (newFilter) => {
    filter.value = newFilter
  }

  const clearAll = async () => {
    if (!authStore.user) return
    if (!confirm('Are you sure you want to delete all goals? This cannot be undone.')) return
    
    try {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('user_id', authStore.user.id)
      
      if (error) throw error
      goals.value = []
    } catch (err) {
      console.error('Error clearing all goals:', err.message)
    }
  }

  return {
    goals, filter, loading,
    filteredGoals, totalCount, completedCount, progress,
    fetchGoals, addGoal, editGoal, toggleGoal, removeGoal, setFilter,
    clearAll,
    addMilestone, toggleMilestone, updateMilestoneStatus, removeMilestone
  }
})
