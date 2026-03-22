<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  error.value = '' // Reset previous error
  
  const success = await authStore.login(email.value, password.value)
  
  if (success) {
    // Redirect to dashboard on successful login
    router.push({ name: 'dashboard' }) 
  } else {
    // Display error message from store
    error.value = authStore.error 
  }
}

const goToRegister = () => router.push('/register')
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 p-4">
    
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
      
      <div class="text-center">
        <div class="flex justify-center mb-4">
          <div class="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <span class="text-white text-2xl font-bold">P</span>
          </div>
        </div>
        <h1 class="text-3xl font-bold text-slate-800">Welcome Back</h1>
        <p class="text-slate-500 mt-2">Please enter your details to sign in</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input 
            type="email" 
            v-model="email" 
            placeholder="Enter your email"
            class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
            required
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <div class="relative">
            <input 
              :type="showPassword ? 'text' : 'password'" 
              v-model="password" 
              placeholder="Enter your password"
              class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white pr-12"
              required
            >
            <button 
              type="button" 
              @click="togglePasswordVisibility"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              {{ showPassword ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl text-center font-medium animate-pulse">
          {{ error }}
        </div>

        <button 
          type="submit" 
          :disabled="authStore.loading"
          class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-md shadow-indigo-200 mt-2"
        >
          {{ authStore.loading ? 'Signing In...' : 'Sign In' }}
        </button>
      </form>

      <p class="text-center text-sm text-slate-600 pt-2">
        Don't have an account? 
        <button @click="goToRegister" class="font-semibold text-indigo-600 hover:text-indigo-700 focus:outline-none hover:underline">
          Sign up for free
        </button>
      </p>

    </div>
  </div>
</template>
