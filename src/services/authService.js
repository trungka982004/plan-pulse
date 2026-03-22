import { supabase } from './supabase'

const CURRENT_USER_KEY = 'todo_app_current_user'

export const authService = {
  // Register user
  async register(email, password, metadata = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    
    if (error) throw error
    return data.user
  },

  // Login user
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
    
    const { user } = data
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    }
    
    return user
  },

  // Get currently logged-in user session
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(CURRENT_USER_KEY)
    }
    return user
  },

  // Logout user
  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}