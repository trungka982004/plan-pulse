<script setup>
import { ref, onMounted, computed } from 'vue'
import { useJournalStore } from '../stores/journalStore'
import BaseButton from '../components/base/BaseButton.vue'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

const journalStore = useJournalStore()

onMounted(() => {
  journalStore.fetchJournals()
})

const currentEntry = ref('')
const currentMood = ref('neutral')
const isSubmitting = ref(false)

const defaultMoods = [
  { value: 'happy', icon: '😊', label: 'Happy', color: 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/50' },
  { value: 'excited', icon: '🤩', label: 'Excited', color: 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-500/20 dark:text-yellow-300 dark:border-yellow-500/50' },
  { value: 'proud', icon: '😎', label: 'Proud', color: 'bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/50' },
  { value: 'calm', icon: '😌', label: 'Calm', color: 'bg-teal-100 text-teal-700 border-teal-300 dark:bg-teal-500/20 dark:text-teal-300 dark:border-teal-500/50' },
  { value: 'neutral', icon: '😐', label: 'Neutral', color: 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-600/40 dark:text-slate-200 dark:border-slate-500/50' },
  { value: 'tired', icon: '😴', label: 'Tired', color: 'bg-stone-100 text-stone-700 border-stone-300 dark:bg-stone-500/20 dark:text-stone-300 dark:border-stone-500/50' },
  { value: 'anxious', icon: '😬', label: 'Anxious', color: 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-500/20 dark:text-orange-300 dark:border-orange-500/50' },
  { value: 'sad', icon: '😔', label: 'Sad', color: 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/50' },
  { value: 'angry', icon: '😠', label: 'Angry', color: 'bg-red-100 text-red-700 border-red-300 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/50' },
  { value: 'loved', icon: '🥰', label: 'Loved', color: 'bg-pink-100 text-pink-700 border-pink-300 dark:bg-pink-500/20 dark:text-pink-300 dark:border-pink-500/50' }
]

const customMoodsStr = localStorage.getItem('customMoods')
const customMoods = ref(customMoodsStr ? JSON.parse(customMoodsStr) : [])

const moods = computed(() => [...defaultMoods, ...customMoods.value])

const isAddingCustomMood = ref(false)
const showEmojiPicker = ref(false)
const newMoodIcon = ref('')
const newMoodLabel = ref('')

const onSelectEmoji = (emoji) => {
    newMoodIcon.value = emoji.i || emoji.native || ''
    showEmojiPicker.value = false
}

const saveCustomMood = () => {
    if (newMoodLabel.value.trim() && newMoodIcon.value.trim()) {
        const val = newMoodLabel.value.trim().toLowerCase().replace(/\s+/g, '-')
        const custom = {
            value: val,
            icon: newMoodIcon.value.trim(),
            label: newMoodLabel.value.trim(),
            color: 'bg-violet-100 text-violet-700 border-violet-300 dark:bg-violet-500/20 dark:text-violet-300 dark:border-violet-500/50'
        }
        customMoods.value.push(custom)
        localStorage.setItem('customMoods', JSON.stringify(customMoods.value))
        currentMood.value = val
        isAddingCustomMood.value = false
        showEmojiPicker.value = false
        newMoodIcon.value = ''
        newMoodLabel.value = ''
    }
}

const addEntry = () => {
  if (currentEntry.value.trim() && !isSubmitting.value) {
    isSubmitting.value = true
    journalStore.addEntry(currentEntry.value, currentMood.value)
    currentEntry.value = ''
    currentMood.value = 'neutral'
    setTimeout(() => {
      isSubmitting.value = false
    }, 300)
  }
}

const formatDate = (isoString) => {
  if (!isoString) return ''
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
}

const getMoodStyle = (moodValue) => {
  const m = moods.value.find(m => m.value === moodValue)
  return m ? m.color : 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-600/40 dark:text-slate-200 dark:border-slate-500/50'
}

const getMoodIcon = (moodValue) => {
  const m = moods.value.find(m => m.value === moodValue)
  return m ? m.icon : '😐'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="journalStore.loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Header -->
      <div class="flex items-end justify-between">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Journal</h1>
          <p class="text-slate-500 dark:text-slate-400 mt-1">Reflect on your day, your goals, and your habits.</p>
        </div>
      </div>

      <!-- New Entry Form -->
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col space-y-4 transition-colors duration-200">
        <div class="flex flex-col mb-4">
          <span class="text-sm font-semibold tracking-wide text-slate-600 dark:text-slate-300 uppercase mb-2">How are you feeling?</span>
          <div class="flex flex-wrap gap-2 items-center">
            <button 
              v-for="mood in moods" 
              :key="mood.value"
              @click="currentMood = mood.value"
              class="px-3 py-1.5 rounded-full border text-sm font-medium transition-colors"
              :class="[
                currentMood === mood.value ? mood.color : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm'
              ]"
            >
              {{ mood.icon }} {{ mood.label }}
            </button>
            
            <div v-if="!isAddingCustomMood" class="relative">
              <button 
                @click="isAddingCustomMood = true; showEmojiPicker = false"
                class="px-3 py-1.5 rounded-full border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                + Custom
              </button>
            </div>
            <div v-else class="flex items-center gap-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full px-2 py-1 relative">
              <button 
                @click="showEmojiPicker = !showEmojiPicker"
                title="Pick an Emoji"
                class="w-10 bg-transparent outline-none text-center text-lg px-1 py-0.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors" 
              >
                {{ newMoodIcon || '😀' }}
              </button>
              
              <div v-if="showEmojiPicker" class="absolute z-50 top-full left-0 mt-2 shadow-2xl rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                 <EmojiPicker :native="true" @select="onSelectEmoji" class="dark:bg-slate-800" />
              </div>

              <div class="w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
              <input 
                v-model="newMoodLabel" 
                @keyup.enter="saveCustomMood"
                placeholder="Feeling" 
                class="w-24 bg-transparent outline-none text-sm px-1 py-0.5 text-slate-700 dark:text-slate-200" 
              />
              <button 
                @click="saveCustomMood"
                :disabled="!newMoodLabel.trim() || !newMoodIcon.trim()"
                class="text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 p-0.5 bg-emerald-50 dark:bg-emerald-900/40 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </button>
              <button 
                @click="isAddingCustomMood = false"
                class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-0.5 ml-0.5"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
        </div>
        <textarea 
          v-model="currentEntry" 
          placeholder="Write what's on your mind..."
          class="w-full h-32 p-4 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all resize-y text-slate-700 dark:text-slate-100 bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-500"
        ></textarea>
        <div class="flex justify-end">
          <BaseButton 
            variant="primary" 
            @click="addEntry" 
            :disabled="!currentEntry.trim() || isSubmitting"
            class="px-8 py-3"
          >
            <span class="text-lg">💾</span>
            {{ isSubmitting ? 'Saving...' : 'Save Entry' }}
          </BaseButton>
        </div>
      </div>

      <!-- Journal History -->
      <div>
        <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">Recent Entries</h2>
        <div v-if="journalStore.recentEntries.length === 0" class="text-center py-12 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 border-dashed transition-colors duration-200">
          <svg class="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          <h3 class="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">No entries</h3>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Get started by creating your first journal entry.</p>
        </div>
        
        <div v-else class="space-y-4">
          <div 
            v-for="entry in journalStore.recentEntries" 
            :key="entry.id"
            class="group bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-sky-300 dark:hover:border-sky-500 transition-all duration-200 relative"
          >
            <div class="flex items-center justify-between mb-3 text-sm">
              <span class="font-medium text-slate-500 dark:text-slate-400">{{ formatDate(entry.created_at) }}</span>
              <div class="flex items-center gap-3">
                <span class="flex items-center whitespace-nowrap px-2.5 py-0.5 rounded-full border text-xs font-semibold" :class="getMoodStyle(entry.mood)">
                  {{ getMoodIcon(entry.mood) }} <span class="ml-1 capitalize">{{ entry.mood }}</span>
                </span>
                <button 
                  @click="journalStore.removeEntry(entry.id)"
                  class="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete Entry"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <p class="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{{ entry.content }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
@reference "../assets/main.css";
</style>
