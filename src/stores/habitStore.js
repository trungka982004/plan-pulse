import { defineStore } from "pinia"
import { ref, computed } from 'vue'
import { supabase } from '../services/supabase'
import { useAuthStore } from './authStore'

export const useHabitStore = defineStore("habit", () => {
  const habits = ref([])
  const filter = ref('all')
  const loading = ref(false)
  const authStore = useAuthStore()

  // Fetch all habits and their logs for the current user
  const fetchHabits = async () => {
    if (!authStore.user) return
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('habits')
        .select(`
          *,
          habit_logs (*)
        `)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      habits.value = (data || []).map(habit => {
        // Calculate dynamic properties
        const completedDates = habit.habit_logs.map(log => log.date)
        const today = new Date().toISOString().split('T')[0]
        const isDoneToday = completedDates.includes(today)
        
        return {
          ...habit,
          completedDates,
          done: isDoneToday
        }
      })
      
      // Update streaks locally if needed or trust DB
      habits.value.forEach(h => calculateStreak(h))
      
    } catch (err) {
      console.error('Error fetching habits:', err.message)
    } finally {
      loading.value = false
    }
  }

  const calculateStreak = (habit) => {
    if (!habit.completedDates || habit.completedDates.length === 0) {
      habit.streak = 0
      return
    }
    const dates = [...habit.completedDates].sort((a,b) => new Date(b) - new Date(a))
    const todayStr = new Date().toISOString().split('T')[0]
    let yesterdayD = new Date()
    yesterdayD.setDate(yesterdayD.getDate() - 1)
    const yesterdayStr = yesterdayD.toISOString().split('T')[0]
    
    let streak = 0
    let expectedDateStr = ''
    
    if (dates[0] === todayStr) {
      streak = 1
      expectedDateStr = yesterdayStr
    } else if (dates[0] === yesterdayStr) {
      streak = 1
      let d = new Date(yesterdayD)
      d.setDate(d.getDate() - 1)
      expectedDateStr = d.toISOString().split('T')[0]
    } else {
      habit.streak = 0
      return
    }
    
    for (let i = 1; i < dates.length; i++) {
      if (dates[i] === expectedDateStr) {
        streak++
        let d = new Date(expectedDateStr)
        d.setDate(d.getDate() - 1)
        expectedDateStr = d.toISOString().split('T')[0]
      } else {
        break
      }
    }
    habit.streak = streak
  }

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
  const addHabit = async (name) => {
    if (!authStore.user) return
    try {
      const { data, error } = await supabase
        .from('habits')
        .insert([{
          user_id: authStore.user.id,
          name,
          frequency: 'daily',
          streak: 0
        }])
        .select()
      
      if (error) throw error
      if (data) {
        habits.value.unshift({ 
          ...data[0], 
          completedDates: [], 
          habit_logs: [],
          done: false 
        })
      }
    } catch (err) {
      console.error('Error adding habit:', err.message)
    }
  }

  const editHabit = async (id, updates) => {
    try {
      const { error } = await supabase
        .from('habits')
        .update(updates)
        .eq('id', id)
      
      if (error) throw error
      const habit = habits.value.find(h => h.id === id)
      if (habit) Object.assign(habit, updates)
    } catch (err) {
      console.error('Error editing habit:', err.message)
    }
  }

  const toggleHabit = async (id) => {
    const habit = habits.value.find(h => h.id === id)
    if (!habit) return
    
    const today = new Date().toISOString().split('T')[0]
    const isCurrentlyDone = habit.done
    
    try {
      if (!isCurrentlyDone) {
        // Mark as done: Insert into habit_logs
        const { error } = await supabase
          .from('habit_logs')
          .insert([{ habit_id: id, date: today, completed: true }])
        
        if (error) throw error
        habit.completedDates.push(today)
        habit.done = true
      } else {
        // Unmark: Delete from habit_logs
        const { error } = await supabase
          .from('habit_logs')
          .delete()
          .eq('habit_id', id)
          .eq('date', today)
        
        if (error) throw error
        habit.completedDates = habit.completedDates.filter(d => d !== today)
        habit.done = false
      }
      
      // Update streak and sync with DB
      calculateStreak(habit)
      await supabase.from('habits').update({ streak: habit.streak }).eq('id', id)
      
    } catch (err) {
      console.error('Error toggling habit:', err.message)
    }
  }

  const removeHabit = async (id) => {
    try {
      const { error } = await supabase
        .from('habits')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      habits.value = habits.value.filter(h => h.id !== id)
    } catch (err) {
      console.error('Error removing habit:', err.message)
    }
  }

  const setFilter = (newFilter) => {
    filter.value = newFilter
  }

  const clearAll = async () => {
    if (!authStore.user) return
    if (!confirm('Are you sure you want to delete all habits? This cannot be undone.')) return
    
    try {
      const { error } = await supabase
        .from('habits')
        .delete()
        .eq('user_id', authStore.user.id)
      
      if (error) throw error
      habits.value = []
    } catch (err) {
      console.error('Error clearing all habits:', err.message)
    }
  }

  return {
    habits, filter, loading,
    filteredHabits, totalCount, completedCount, progress,
    fetchHabits, addHabit, editHabit, toggleHabit, removeHabit, setFilter,
    clearAll
  }
})
