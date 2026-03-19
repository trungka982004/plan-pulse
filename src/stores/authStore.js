import { defineStore } from 'pinia'
import { authService } from '../services/authService'
import { supabase } from '../services/supabase'
import { migrationService } from '../services/migrationService'
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, 
    error: null,
    loading: false,
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user, 
  },
  
  actions: {
    // Check for existing session at startup
    async init() {
      this.loading = true;
      try {
        const { data: { user } } = await supabase.auth.getUser()
        this.user = user;
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        this.loading = false;
      }
    },

    async login(email, password) {
      this.error = null;
      this.loading = true;
      try {
        const user = await authService.login(email, password);
        this.user = user;
        
        // Trigger migration if local data exists
        if (user) {
          await migrationService.migrateLocalStorageToSupabase(user.id);
        }
        
        return true;
      } catch (err) {
        this.error = err.message || 'Login failed';
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async register(email, password) {
      this.error = null;
      this.loading = true;
      try {
        await authService.register(email, password);
        return true;
      } catch (err) {
        this.error = err.message || 'Registration failed';
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async logout() {
      try {
        await authService.logout();
        this.user = null;
        router.push('/login');
      } catch (err) {
        console.error('Logout error:', err);
      }
    }
  }
});