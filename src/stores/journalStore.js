import { defineStore } from "pinia"
import { ref, computed } from 'vue'
import { supabase } from '../services/supabase'
import { useAuthStore } from './authStore'

export const useJournalStore = defineStore("journal", () => {
  const entries = ref([])
  const loading = ref(false)
  const authStore = useAuthStore()

  // Fetch all journal entries for the current user
  const fetchJournals = async () => {
    if (!authStore.user) return
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('journals')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      entries.value = data || []
    } catch (err) {
      console.error('Error fetching journals:', err.message)
    } finally {
      loading.value = false
    }
  }

  // Getters
  const recentEntries = computed(() => {
    return [...entries.value].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  })

  // Actions
  const addEntry = async (content, mood) => {
    if (!authStore.user || !content.trim()) return
    try {
      const { data, error } = await supabase
        .from('journals')
        .insert([{
          user_id: authStore.user.id,
          content: content.trim(),
          mood: mood || 'neutral'
        }])
        .select()
      
      if (error) throw error
      if (data) {
        entries.value.unshift(data[0])
      }
    } catch (err) {
      console.error('Error adding journal entry:', err.message)
    }
  }

  const editEntry = async (id, newContent, newMood) => {
    if (!newContent.trim()) return
    try {
      const { error } = await supabase
        .from('journals')
        .update({
          content: newContent.trim(),
          mood: newMood
        })
        .eq('id', id)
      
      if (error) throw error
      const entry = entries.value.find(e => e.id === id)
      if (entry) {
        entry.content = newContent.trim()
        if (newMood) entry.mood = newMood
      }
    } catch (err) {
      console.error('Error editing journal entry:', err.message)
    }
  }

  const removeEntry = async (id) => {
    try {
      const { error } = await supabase
        .from('journals')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      entries.value = entries.value.filter(e => e.id !== id)
    } catch (err) {
      console.error('Error removing journal entry:', err.message)
    }
  }

  return {
    entries, loading,
    recentEntries,
    fetchJournals, addEntry, editEntry, removeEntry
  }
})
