<script setup>
import { ref, watch, onMounted } from 'vue'
import { useSettingStore } from '@/stores/settingStore'
import { useAuthStore } from '@/stores/authStore'
import { notificationService } from '../services/notificationService'
import { imageService } from '../services/imageService'
import BaseCard from "../components/base/BaseCard.vue"

const store = useSettingStore()
const authStore = useAuthStore()

const profileForm = ref({
  full_name: '',
  avatar_url: '',
  email: '',
  bio: ''
})

const showAvatarModal = ref(false)
const remoteAvatarUrl = ref('')
const selectedFile = ref(null)
const uploadingAvatar = ref(false)

const showPasswordFields = ref(false)
const showPassword = ref(false)
const currentPassword = ref('')
const newPassword = ref('')
const verifyingPassword = ref(false)
const passwordError = ref('')
const isPasswordVerified = ref(false)

// Initialize form when profile changes
watch(() => authStore.profile, (newProfile) => {
  if (newProfile) {
    profileForm.value = {
      full_name: newProfile.full_name || '',
      avatar_url: newProfile.avatar_url || '',
      email: newProfile.email || '',
      bio: newProfile.bio || ''
    }
    remoteAvatarUrl.value = newProfile.avatar_url || ''
  }
}, { immediate: true })

const saveProfile = async () => {
  const success = await authStore.updateProfile({
    full_name: profileForm.value.full_name,
    avatar_url: profileForm.value.avatar_url,
    email: profileForm.value.email,
    bio: profileForm.value.bio
  })
  
  if (success) {
    notificationService.sendNotification('Profile Updated', { body: 'Your profile has been saved successfully.' })
  } else {
    notificationService.sendNotification('Update Failed', { body: authStore.error || 'Something went wrong.' })
  }
}

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (file) selectedFile.value = file
}

const uploadAndApplyAvatar = async () => {
  if (!selectedFile.value) return
  uploadingAvatar.value = true
  try {
    const url = await imageService.uploadAvatar(authStore.user.id, selectedFile.value)
    profileForm.value.avatar_url = url
    await saveProfile()
    showAvatarModal.value = false
  } catch (err) {
    notificationService.sendNotification('Upload Error', { body: err.message || 'Failed to upload image.' })
  } finally {
    uploadingAvatar.value = false
  }
}

const applyRemoteAvatar = async () => {
  profileForm.value.avatar_url = remoteAvatarUrl.value
  await saveProfile()
  showAvatarModal.value = false
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleVerifyPassword = async () => {
  if (!currentPassword.value) return
  verifyingPassword.value = true
  passwordError.value = ''
  
  try {
    const { error: verifyError } = await authStore.verifyPassword(currentPassword.value)
    if (verifyError) {
      passwordError.value = 'Incorrect current password'
      return
    }
    isPasswordVerified.value = true
  } catch (err) {
    notificationService.sendNotification('Error', { body: err.message || 'Verification failed.' })
  } finally {
    verifyingPassword.value = false
  }
}

const changePassword = async () => {
  if (!newPassword.value || !isPasswordVerified.value) return
  verifyingPassword.value = true
  
  try {
    const { error: updateError } = await authStore.changePassword(newPassword.value)
    if (updateError) throw updateError
    
    notificationService.sendNotification('Success!', { body: 'Password has been changed.' })
    currentPassword.value = ''
    newPassword.value = ''
    isPasswordVerified.value = false
    showPasswordFields.value = false
  } catch (err) {
    notificationService.sendNotification('Error', { body: err.message || 'Failed to change password.' })
  } finally {
    verifyingPassword.value = false
  }
}

const toggleNotifications = async () => {
    if (!store.notificationsEnabled) {
        const granted = await notificationService.requestPermission()
        if (granted) {
            store.updateAISettings({ notificationsEnabled: true })
            notificationService.sendNotification('System Alert', { body: 'Push notifications are now enabled!' })
        } else {
            notificationService.sendNotification('Permission Required', { body: 'Please enable notifications in your browser settings to use this feature.' })
        }
    } else {
        store.updateAISettings({ notificationsEnabled: false })
        notificationService.sendNotification('System Alert', { body: 'Push notifications disabled.' })
    }
}
</script>

<template>
  <div class="py-8 px-4 h-full settings-page">
    <div class="max-w-2xl mx-auto h-full">
      <BaseCard class="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 border-none text-white shadow-lg shadow-purple-500/30 settings-purple-container min-h-full">
        <!-- Decorative background elements -->
        <div class="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 rounded-full bg-black opacity-10 blur-2xl pointer-events-none"></div>

        <div class="relative z-10 space-y-8">
          <!-- Section Profile -->
          <section>
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xs font-bold uppercase tracking-widest text-white/80">User Profile</h3>
              <button 
                @click="saveProfile" 
                :disabled="authStore.loading"
                class="text-xs font-bold bg-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-all border border-white/30 disabled:opacity-50"
              >
                {{ authStore.loading ? 'Saving...' : 'Save Profile' }}
              </button>
            </div>
            
            <div class="flex flex-col md:flex-row gap-8">
              <!-- Avatar Column -->
              <div class="shrink-0 flex flex-col items-center gap-4">
                <div class="relative group cursor-pointer" @click="showAvatarModal = true">
                  <img :src="profileForm.avatar_url || store.userProfile.avatar" class="w-28 h-28 rounded-[2.5rem] border-4 border-white/30 shadow-2xl object-cover" />
                  <div class="absolute inset-0 bg-black/40 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <span class="text-white text-xs font-bold tracking-wide">Change</span>
                  </div>
                </div>
                <span class="text-[10px] font-bold text-white/60 uppercase tracking-tighter">Click to change avatar</span>
              </div>

              <!-- Info Column -->
              <div class="flex-1 space-y-5">
                <!-- 1. Name -->
                <div class="space-y-1.5">
                  <label class="text-[11px] font-bold text-white/80 uppercase tracking-wider ml-1">Full Name</label>
                  <input v-model="profileForm.full_name" placeholder="John Doe" class="w-full px-4 py-3.5 rounded-2xl border border-neutral-200 bg-white text-neutral-900 outline-none focus:ring-4 focus:ring-indigo-100 transition-all" />
                </div>

                <!-- 2. Email -->
                <div class="space-y-1.5">
                  <label class="text-[11px] font-bold text-white/80 uppercase tracking-wider ml-1">Email (Locked)</label>
                  <div class="relative">
                    <input :value="profileForm.email" disabled class="w-full px-4 py-3.5 rounded-2xl border border-neutral-200 bg-neutral-50 text-neutral-400 outline-none cursor-not-allowed" />
                    <span class="absolute right-4 top-1/2 -translate-y-1/2">🔒</span>
                  </div>
                </div>

                <!-- 3. Password -->
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between ml-1">
                    <label class="text-[11px] font-bold text-white/80 uppercase tracking-wider">Password</label>
                    <button @click="showPasswordFields = !showPasswordFields" class="text-[10px] font-bold text-white hover:text-white/80 uppercase tracking-tight">
                      {{ showPasswordFields ? 'Cancel' : 'Change Password' }}
                    </button>
                  </div>
                  
                  <div v-if="!showPasswordFields" class="relative group">
                    <input type="password" value="••••••••" disabled class="w-full px-4 py-3.5 rounded-2xl border border-neutral-100 bg-neutral-50/50 text-neutral-300 outline-none cursor-not-allowed" />
                  </div>
                  
                  <div v-else class="space-y-4 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 animate-in fade-in slide-in-from-top-2">
                    <!-- Step 1: Verify Current Password -->
                    <div class="space-y-3">
                      <div class="space-y-2">
                        <label class="text-[9px] font-bold text-white/80 uppercase ml-1">Current Password Required</label>
                        <div class="relative">
                          <input 
                            :type="showPassword ? 'text' : 'password'" 
                            v-model="currentPassword" 
                            placeholder="Current Password" 
                            autocomplete="off"
                            :disabled="isPasswordVerified"
                            :class="[
                              passwordError ? 'border-red-300 ring-4 ring-red-100' : 'border-neutral-200',
                              isPasswordVerified ? 'bg-indigo-100/50' : 'bg-white'
                            ]"
                            class="w-full px-4 py-3 rounded-xl border outline-none transition-all shadow-sm"
                          />
                          <button v-if="!isPasswordVerified" @click="togglePasswordVisibility" class="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white">
                            {{ showPassword ? '🙈' : '👁️' }}
                          </button>
                          <span v-if="isPasswordVerified" class="absolute right-3 top-1/2 -translate-y-1/2 text-white">✓</span>
                        </div>
                        <p v-if="passwordError" class="text-[10px] text-red-300 font-bold ml-1">{{ passwordError }}</p>
                      </div>

                      <button 
                        v-if="!isPasswordVerified"
                        @click="handleVerifyPassword" 
                        :disabled="!currentPassword || verifyingPassword"
                        class="w-full py-2.5 bg-neutral-800 hover:bg-neutral-900 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                      >
                        {{ verifyingPassword ? 'Verifying...' : 'Verify Password' }}
                      </button>
                    </div>

                    <!-- Step 2: New Password Unlocked -->
                    <div v-if="isPasswordVerified" class="space-y-3 animate-in slide-in-from-top-4 duration-300">
                      <div class="h-px bg-indigo-100 my-1"></div>
                      <div class="space-y-2">
                        <label class="text-[9px] font-bold text-white/80 uppercase ml-1">New Password</label>
                        <div class="relative">
                          <input 
                            :type="showPassword ? 'text' : 'password'" 
                            v-model="newPassword" 
                            placeholder="Type new password" 
                            autocomplete="new-password"
                            class="w-full px-4 py-3 rounded-xl border border-indigo-200 bg-white outline-none focus:ring-4 focus:ring-indigo-100 transition-all shadow-sm"
                          />
                          <button @click="togglePasswordVisibility" class="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white">
                            {{ showPassword ? '🙈' : '👁️' }}
                          </button>
                        </div>
                      </div>
                      
                      <button 
                        @click="changePassword" 
                        :disabled="!newPassword || verifyingPassword"
                        class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg"
                      >
                        {{ verifyingPassword ? 'Saving Changes...' : 'Update Password' }}
                      </button>
                    </div>
                  </div>
                </div>

                <!-- 4. Short Bio -->
                <div class="space-y-1.5">
                  <label class="text-[11px] font-bold text-white/80 uppercase tracking-wider ml-1">Short Bio</label>
                  <textarea v-model="profileForm.bio" rows="3" placeholder="Tell us about your goals..." class="w-full px-4 py-3.5 rounded-2xl border border-neutral-200 bg-white text-neutral-900 outline-none focus:ring-4 focus:ring-indigo-100 transition-all resize-none"></textarea>
                </div>
              </div>
            </div>
          </section>

          <hr class="border-white/20" />

          <!-- AI Goal Coach -->
          <section class="space-y-4">
            <h3 class="text-xs font-bold text-white/80 uppercase tracking-widest mb-4">AI Goal Coach</h3>
            <div class="flex items-center justify-between p-5 bg-neutral-50 rounded-2xl border border-neutral-200/50">
               <div class="flex items-center gap-4">
                 <div class="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl shadow-sm border border-white/20">🤖</div>
                 <div>
                   <span class="font-bold block text-white text-sm">Enable AI Goal Coach</span>
                   <span class="text-[10px] text-white/60">Get personalized feedback and motivation</span>
                 </div>
               </div>
               <button @click="store.toggleAIActive()" :class="store.aiActive ? 'bg-indigo-600 border-white/50' : 'bg-neutral-300 border-transparent'" class="w-14 h-7 rounded-full relative transition-all shadow-md border">
                 <div :class="store.aiActive ? 'translate-x-8' : 'translate-x-1'" class="w-5 h-5 bg-white rounded-full absolute top-1 transition-transform shadow-sm"></div>
               </button>
            </div>
          </section>

          <!-- Notifications -->
          <section class="space-y-4">
            <h3 class="text-xs font-bold text-white/80 uppercase tracking-widest mb-4">Notifications</h3>
            <div class="flex items-center justify-between p-5 bg-neutral-50 rounded-2xl border border-neutral-200/50">
               <div class="flex items-center gap-4">
                 <div class="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl shadow-sm border border-white/20">🔔</div>
                 <div>
                   <span class="font-bold block text-white text-sm">Push Notifications</span>
                   <span class="text-[10px] text-white/60">Receive smart alerts about your goals and habits</span>
                 </div>
               </div>
               <button @click="toggleNotifications" :class="store.notificationsEnabled ? 'bg-indigo-600 border-white/50' : 'bg-neutral-300 border-transparent'" class="w-14 h-7 rounded-full relative transition-all shadow-md border">
                 <div :class="store.notificationsEnabled ? 'translate-x-8' : 'translate-x-1'" class="w-5 h-5 bg-white rounded-full absolute top-1 transition-transform shadow-sm"></div>
               </button>
            </div>
          </section>

          <div class="flex justify-end pt-2">
            <button @click="authStore.logout()" class="px-8 py-3 bg-red-500/10 text-red-200 hover:bg-red-500 hover:text-white font-bold rounded-2xl transition-all shadow-sm border border-red-400/20">
              Sign Out
            </button>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Avatar Selection Modal -->
    <div v-if="showAvatarModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div class="bg-indigo-900/80 backdrop-blur-xl w-full max-w-md rounded-3xl shadow-2xl p-8 space-y-6 animate-in zoom-in-95 duration-200 border border-white/20 settings-purple-container">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-xl font-bold text-white">Update Avatar</h2>
          <button @click="showAvatarModal = false" class="p-2 hover:bg-white/20 rounded-full transition-colors text-white">✕</button>
        </div>
        
        <div class="space-y-6">
          <!-- Option 1: File Upload -->
          <div class="space-y-3 p-4 bg-white/10 rounded-2xl border border-white/20">
            <h4 class="text-xs font-bold text-white/80 uppercase tracking-wider">Local Upload</h4>
            <div class="flex items-center gap-3">
              <input type="file" @change="onFileChange" accept="image/*" class="text-xs text-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white/20 file:text-white hover:file:bg-white/30" />
            </div>
            <button @click="uploadAndApplyAvatar" :disabled="!selectedFile || uploadingAvatar" class="w-full py-2.5 bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-30">
              {{ uploadingAvatar ? 'Uploading...' : 'Upload & Use' }}
            </button>
          </div>

          <!-- Option 2: Image URL -->
          <div class="space-y-3 p-4 bg-white/10 rounded-2xl border border-white/20">
            <h4 class="text-xs font-bold text-white/80 uppercase tracking-wider">Image URL</h4>
            <input v-model="remoteAvatarUrl" placeholder="https://unsplash.com/..." class="w-full px-4 py-2.5 rounded-xl border border-white/30 bg-white/10 text-xs font-medium text-white outline-none focus:ring-2 focus:ring-white/50 placeholder:text-white/40" />
            <button @click="applyRemoteAvatar" :disabled="!remoteAvatarUrl" class="w-full py-2.5 bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-30">
              Apply URL
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Override styles for components inside the purple container */
.settings-purple-container .text-neutral-500,
.settings-purple-container .text-neutral-800,
.settings-purple-container .text-neutral-900,
.settings-purple-container .text-neutral-600,
.settings-purple-container .text-neutral-400,
.settings-purple-container .text-neutral-300,
.settings-purple-container .text-neutral-700 {
  color: #ffffff !important;
}

/* Glassmorphism for inputs, sections and cards */
.settings-purple-container .bg-white,
.settings-purple-container .bg-neutral-50,
.settings-purple-container .bg-neutral-800\/40,
.settings-purple-container .bg-indigo-50\/50,
.settings-purple-container .bg-neutral-900,
.settings-purple-container .bg-neutral-800,
.settings-purple-container .bg-indigo-100\/50 {
  background-color: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
  backdrop-filter: blur(8px);
}

.settings-purple-container input, 
.settings-purple-container textarea {
  color: #ffffff !important;
}

.settings-purple-container input::placeholder, 
.settings-purple-container textarea::placeholder {
  color: rgba(255, 255, 255, 0.6) !important;
}

/* Border overrides */
.settings-purple-container .border-neutral-100,
.settings-purple-container .border-neutral-200,
.settings-purple-container .border-neutral-700,
.settings-purple-container .border-indigo-100,
.settings-purple-container .border-indigo-200 {
  border-color: rgba(255, 255, 255, 0.3) !important;
}

/* Specific buttons and backgrounds */
.settings-purple-container .bg-indigo-600,
.settings-purple-container .bg-purple-600 {
  background-color: rgba(255, 255, 255, 0.3) !important;
  color: #ffffff !important;
}

.settings-purple-container .bg-indigo-600:hover,
.settings-purple-container .bg-purple-600:hover {
  background-color: rgba(255, 255, 255, 0.4) !important;
}

.settings-purple-container .bg-neutral-300 {
  background-color: rgba(255, 255, 255, 0.2) !important;
}

/* Icons box */
.settings-purple-container .bg-purple-100,
.settings-purple-container .bg-indigo-100 {
  background-color: rgba(255, 255, 255, 0.2) !important;
}

/* Danger Button */
.settings-purple-container .bg-red-500\/10 {
  background-color: rgba(239, 68, 68, 0.2) !important;
  color: #fecaca !important;
}
.settings-purple-container .bg-red-500\/10:hover {
  background-color: rgba(239, 68, 68, 0.4) !important;
  color: #ffffff !important;
}
</style>