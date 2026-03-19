import { supabase } from './supabase'

export const migrationService = {
  async migrateLocalStorageToSupabase(userId) {
    console.log('Starting migration for user:', userId)
    
    // 1. Migrate Goals
    const localGoals = JSON.parse(localStorage.getItem('todo_app_goals') || '[]')
    if (localGoals.length > 0) {
      for (const goal of localGoals) {
        const { data: newGoal, error: goalError } = await supabase
          .from('goals')
          .insert([{
            user_id: userId,
            title: goal.text,
            description: '',
            status: goal.done ? 'completed' : 'pending',
            created_at: new Date(goal.id).toISOString()
          }])
          .select()
        
        if (!goalError && newGoal && goal.milestones) {
          // Migrate milestones for this goal
          const milestones = goal.milestones.map(m => ({
            goal_id: newGoal[0].id,
            title: m.text,
            status: m.done ? 'completed' : 'pending'
          }))
          if (milestones.length > 0) {
            await supabase.from('milestones').insert(milestones)
          }
        }
      }
      localStorage.removeItem('todo_app_goals')
    }

    // 2. Migrate Habits
    const localHabits = JSON.parse(localStorage.getItem('todo_app_habits') || '[]')
    if (localHabits.length > 0) {
      for (const habit of localHabits) {
        const { data: newHabit, error: habitError } = await supabase
          .from('habits')
          .insert([{
            user_id: userId,
            name: habit.text,
            streak: habit.streak || 0,
            created_at: new Date(habit.id).toISOString()
          }])
          .select()
        
        if (!habitError && newHabit && habit.completedDates) {
          const logs = habit.completedDates.map(date => ({
            habit_id: newHabit[0].id,
            date: date,
            completed: true
          }))
          if (logs.length > 0) {
            await supabase.from('habit_logs').insert(logs)
          }
        }
      }
      localStorage.removeItem('todo_app_habits')
    }

    // 3. Migrate Journals
    const localJournals = JSON.parse(localStorage.getItem('todo_app_journals') || '[]')
    if (localJournals.length > 0) {
      const journals = localJournals.map(j => ({
        user_id: userId,
        content: j.content,
        mood: j.mood,
        created_at: j.date || new Date(j.id).toISOString()
      }))
      await supabase.from('journals').insert(journals)
      localStorage.removeItem('todo_app_journals')
    }

    console.log('Migration completed.')
  }
}
