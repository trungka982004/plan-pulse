<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const email = ref('')
const fullName = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const successMessage = ref('')
const showPasswordValue = ref(false)

const togglePasswordVisibility = () => {
  showPasswordValue.value = !showPasswordValue.value
}

const handleRegister = async () => {
  error.value = '' 
  successMessage.value = ''
  
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match!'
    return
  }

  const success = await authStore.register(email.value, password.value, fullName.value)
  
  if (success) {
    successMessage.value = 'Registration successful! Please check your email for confirmation (if enabled) or proceed to login.'
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  } else {
    error.value = authStore.error
  }
}

const goToLogin = () => router.push('/login')
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
        <h1 class="text-3xl font-bold text-slate-800">Create an Account</h1>
        <p class="text-slate-500 mt-2">Start your productivity journey today</p>
      </div>
      
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input 
            type="text" 
            v-model="fullName" 
            placeholder="What should we call you?"
            class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
            required
          >
        </div>
        
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
              :type="showPasswordValue ? 'text' : 'password'" 
              v-model="password" 
              placeholder="Create a password"
              class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white pr-12"
              required
            >
            <button 
              type="button" 
              @click="togglePasswordVisibility"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              {{ showPasswordValue ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
          <div class="relative">
            <input 
              :type="showPasswordValue ? 'text' : 'password'" 
              v-model="confirmPassword" 
              placeholder="Confirm your password"
              class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white pr-12"
              required
            >
            <button 
              type="button" 
              @click="togglePasswordVisibility"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              {{ showPasswordValue ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl text-center font-medium animate-pulse">
          {{ error }}
        </div>

        <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-600 text-sm p-3 rounded-xl text-center font-medium">
          {{ successMessage }}
        </div>

        <button 
          type="submit" 
          :disabled="authStore.loading"
          class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-md shadow-indigo-200 mt-2"
        >
          {{ authStore.loading ? 'Creating Account...' : 'Sign Up' }}
        </button>
      </form>

      <p class="text-center text-sm text-slate-600 pt-2">
        Already have an account? 
        <button @click="goToLogin" class="font-semibold text-indigo-600 hover:text-indigo-700 focus:outline-none hover:underline">
          Sign In
        </button>
      </p>
      
    </div>
  </div>
</template>
