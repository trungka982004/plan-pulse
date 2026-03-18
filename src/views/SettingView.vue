<script setup>
import { useSettingStore } from '@/stores/settingStore'
import { useAuthStore } from '@/stores/authStore'
import BaseCard from "../components/base/BaseCard.vue"

const store = useSettingStore()
const authStore = useAuthStore()
</script>

<template>
  <div class="py-8 px-4 transition-colors duration-300">
    <div class="max-w-2xl mx-auto">
      <BaseCard>
        <div class="space-y-8">
          <!-- Section Profile -->
          <section>
            <h3 class="text-xs font-bold text-indigo-600 dark:text-indigo-300 uppercase tracking-widest mb-4">User Profile</h3>
            <div class="flex flex-col md:flex-row gap-6">
              <div class="shrink-0 mx-auto md:mx-0">
                <img :src="store.user.avatar" class="w-24 h-24 rounded-3xl border-4 border-white dark:border-slate-800 shadow-xl object-cover" />
              </div>
              <div class="flex-1 space-y-4">
                <div class="grid grid-cols-1 gap-4">
                  <div class="space-y-1">
                    <label class="text-xs font-semibold text-slate-500 dark:text-slate-300 px-1">Display Name</label>
                    <input v-model="store.user.name" class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm" />
                  </div>
                  <div class="space-y-1">
                    <label class="text-xs font-semibold text-slate-500 dark:text-slate-300 px-1">Email</label>
                    <input v-model="store.user.email" type="email" class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 space-y-1">
              <label class="text-xs font-semibold text-slate-500 dark:text-slate-300 px-1">Bio</label>
              <textarea v-model="store.user.bio" rows="3" class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm resize-none"></textarea>
            </div>
          </section>
          <hr class="border-slate-100 dark:border-slate-800" />
          <!-- Section Settings -->
          <section class="space-y-4">
            <h3 class="text-xs font-bold text-indigo-600 dark:text-indigo-300 uppercase tracking-widest mb-4">System Preferences</h3>
            
            <div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/50 dark:border-slate-700">
               <div class="flex items-center gap-3">
                 <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-xl">🌙</div>
                 <span class="font-medium dark:text-slate-100">Dark Mode</span>
               </div>
               <button @click="store.toggleDarkMode()" :class="store.darkMode ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'" class="w-12 h-6 rounded-full relative transition-all">
                 <div :class="store.darkMode ? 'translate-x-7' : 'translate-x-1'" class="w-4 h-4 bg-white rounded-full absolute top-1 transition-transform"></div>
               </button>
            </div>

          </section>
          
          <div class="flex justify-end pt-2">
            <button @click="authStore.logout()" class="px-6 py-2.5 bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white dark:bg-rose-500/20 dark:text-rose-300 dark:hover:bg-rose-500 dark:hover:text-white font-semibold rounded-xl transition-colors">
              Sign out
            </button>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>