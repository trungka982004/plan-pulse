import { defineStore } from 'pinia'
import { authService } from '../services/authService'
import { profileService } from '../services/profileService'
import { supabase } from '../services/supabase'
import { migrationService } from '../services/migrationService'
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, 
    profile: null, // Add profile to state
    error: null,
    loading: false,
    initialized: false, // New flag
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user, 
  },
  
  actions: {
    // Check for existing session at startup
    async init() {
      if (this.initialized) return; // Only init once
      this.loading = true;
      try {
        const { data: { user } } = await supabase.auth.getUser()
        this.user = user;
        if (user) {
          await this.fetchProfile(user.id);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        this.loading = false;
        this.initialized = true; // Mark as done
      }
    },

    async fetchProfile(userId) {
      try {
        const profile = await profileService.getProfile(userId);
        this.profile = profile;
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    },

    async login(email, password) {
      this.error = null;
      this.loading = true;
      try {
        const user = await authService.login(email, password);
        this.user = user;
        
        if (user) {
          await this.fetchProfile(user.id);
          // Trigger migration if local data exists
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
    
    async register(email, password, fullName) {
      this.error = null;
      this.loading = true;
      try {
        await authService.register(email, password, { full_name: fullName });
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
        this.profile = null;
        router.push('/login');
      } catch (err) {
        console.error('Logout error:', err);
      }
    },

    async updateProfile(updates) {
      if (!this.user) return false;
      this.loading = true;
      try {
        const updatedProfile = await profileService.updateProfile(this.user.id, updates);
        this.profile = updatedProfile;
        return true;
      } catch (err) {
        this.error = err.message;
        return false;
      } finally {
        this.loading = false;
      }
    },

    async changePassword(newPassword) {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      });
      return { data, error };
    },

    async verifyPassword(currentPassword) {
      if (!this.user?.email) return { error: { message: 'User not found' } };
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: this.user.email,
        password: currentPassword
      });
      return { data, error };
    }
  }
});