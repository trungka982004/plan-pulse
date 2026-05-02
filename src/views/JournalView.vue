<script setup>
import { ref, onMounted, computed } from 'vue'
import { useJournalStore } from '../stores/journalStore'
import BaseButton from '../components/base/BaseButton.vue'
import BaseCard from '../components/base/BaseCard.vue'
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
  { value: 'neutral', icon: '😐', label: 'Neutral', color: 'bg-neutral-100 text-neutral-700 border-neutral-300 dark:bg-neutral-600/40 dark:text-neutral-200 dark:border-neutral-500/50' },
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
  return m ? m.color : 'bg-neutral-100 text-neutral-700 border-neutral-300 dark:bg-neutral-600/40 dark:text-neutral-200 dark:border-neutral-500/50'
}

const getMoodIcon = (moodValue) => {
  const m = moods.value.find(m => m.value === moodValue)
  return m ? m.icon : '😐'
}

const selectedMoodFilter = ref('all')
const showFilterDropdown = ref(false)

const filteredEntries = computed(() => {
  if (selectedMoodFilter.value === 'all') {
    return journalStore.recentEntries
  }
  return journalStore.recentEntries.filter(entry => entry.mood === selectedMoodFilter.value)
})
</script>

<template>
  <div class="journal-page h-full">
    <BaseCard class="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 border-none text-white shadow-lg shadow-indigo-500/30 journal-purple-container min-h-full">
      <!-- Decorative background elements -->
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 rounded-full bg-black opacity-10 blur-2xl pointer-events-none"></div>
      
      <div class="relative z-10 space-y-6">
        <!-- Loading State -->
        <div v-if="journalStore.loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>

        <!-- Content -->
        <template v-else>
          <!-- Header -->
          <div class="flex items-end justify-between">
            <div>
              <h1 class="text-3xl font-extrabold text-white tracking-tight">Journal</h1>
              <p class="text-white/80 mt-1">Reflect on your day, your goals, and your habits.</p>
            </div>
          </div>

          <!-- New Entry Form -->
          <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 flex flex-col space-y-4 transition-colors duration-200">
            <div class="flex flex-col mb-4">
              <span class="text-sm font-semibold tracking-wide text-white uppercase mb-2">How are you feeling?</span>
              <div class="flex flex-wrap gap-2 items-center">
                <button 
                  v-for="mood in moods" 
                  :key="mood.value"
                  @click="currentMood = mood.value"
                  class="px-3 py-1.5 rounded-full border text-sm font-medium transition-colors"
                  :class="[
                    currentMood === mood.value ? mood.color : 'bg-white border-neutral-200 hover:bg-neutral-50 shadow-sm'
                  ]"
                >
                  {{ mood.icon }} {{ mood.label }}
                </button>
                
                <div v-if="!isAddingCustomMood" class="relative">
                  <button 
                    @click="isAddingCustomMood = true; showEmojiPicker = false"
                    class="px-3 py-1.5 rounded-full border border-dashed border-neutral-300 text-white text-sm font-medium transition-colors hover:bg-white"
                  >
                    + Custom
                  </button>
                </div>
                <div v-else class="flex items-center gap-1 bg-neutral-50 border border-neutral-200 rounded-full px-2 py-1 relative">
                  <button 
                    @click="showEmojiPicker = !showEmojiPicker"
                    title="Pick an Emoji"
                    class="w-10 bg-transparent outline-none text-center text-lg px-1 py-0.5 hover:bg-neutral-200 rounded transition-colors" 
                  >
                    {{ newMoodIcon || '😀' }}
                  </button>
                  
                  <div v-if="showEmojiPicker" class="absolute z-50 top-full left-0 mt-2 shadow-2xl rounded-lg overflow-hidden border border-neutral-200 dark:bg-neutral-800">
                     <EmojiPicker :native="true" @select="onSelectEmoji" class="dark:bg-neutral-800" />
                  </div>

                  <div class="w-px h-4 bg-neutral-300"></div>
                  <input 
                    v-model="newMoodLabel" 
                    @keyup.enter="saveCustomMood"
                    placeholder="Feeling" 
                    class="w-24 bg-transparent outline-none text-sm px-1 py-0.5 text-white" 
                  />
                  <button 
                    @click="saveCustomMood"
                    :disabled="!newMoodLabel.trim() || !newMoodIcon.trim()"
                    class="text-emerald-300 hover:text-emerald-400 p-0.5 bg-emerald-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  </button>
                  <button 
                    @click="isAddingCustomMood = false"
                    class="text-neutral-400 hover:text-neutral-200 p-0.5 ml-0.5"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
              </div>
            </div>
            <textarea 
              v-model="currentEntry" 
              placeholder="Write what's on your mind..."
              class="w-full h-32 p-4 border border-neutral-300 rounded-lg outline-none transition-all resize-y text-white bg-neutral-50 placeholder-neutral-400"
            ></textarea>
            <div class="flex justify-end">
              <BaseButton 
                variant="primary" 
                @click="addEntry" 
                :disabled="!currentEntry.trim() || isSubmitting"
                class="px-8 py-3 bg-white text-indigo-600 hover:bg-neutral-100 shadow-md font-bold"
              >
                <span class="text-lg">💾</span>
                {{ isSubmitting ? 'Saving...' : 'Save Entry' }}
              </BaseButton>
            </div>
          </div>

          <!-- Journal History -->
          <div>
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-white tracking-tight">Recent Entries</h2>
              <div class="flex items-center gap-2">
                <div class="relative">
                  <button 
                    @click="showFilterDropdown = !showFilterDropdown" 
                    class="p-2 rounded-lg border border-neutral-300 hover:bg-neutral-50 transition-colors bg-white focus:outline-none" 
                    title="Filter Entries"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <span v-if="selectedMoodFilter !== 'all'" class="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                  </button>
                  
                  <!-- Custom Dropdown -->
                  <div v-if="showFilterDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-neutral-200 py-1 z-20">
                    <button 
                      @click="selectedMoodFilter = 'all'; showFilterDropdown = false"
                      class="w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 transition-colors"
                      :class="selectedMoodFilter === 'all' ? 'text-white font-medium bg-neutral-50' : 'text-neutral-700'"
                    >
                      All Moods
                    </button>
                    <div class="h-px bg-neutral-200 my-1"></div>
                    <div class="max-h-60 overflow-y-auto">
                      <button
                        v-for="mood in moods"
                        :key="mood.value"
                        @click="selectedMoodFilter = mood.value; showFilterDropdown = false"
                        class="w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 transition-colors flex items-center gap-2"
                        :class="selectedMoodFilter === mood.value ? 'text-white font-medium bg-neutral-50' : 'text-neutral-700'"
                      >
                        <span>{{ mood.icon }}</span>
                        <span>{{ mood.label }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="filteredEntries.length === 0" class="text-center py-12 bg-white rounded-xl border border-neutral-200 border-dashed transition-colors duration-200">
              <svg class="mx-auto h-12 w-12 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <h3 class="mt-2 text-sm font-semibold text-white">No entries</h3>
              <p class="mt-1 text-sm text-white/80">Get started by creating your first journal entry.</p>
            </div>
            
            <div v-else class="space-y-4">
              <div 
                v-for="entry in filteredEntries" 
                :key="entry.id"
                class="group bg-white p-5 rounded-xl border border-neutral-200 shadow-sm transition-all duration-200 relative journal-entry-item"
              >
                <div class="flex items-center justify-between mb-3 text-sm">
                  <span class="font-medium text-neutral-500">{{ formatDate(entry.created_at) }}</span>
                  <div class="flex items-center gap-3">
                    <span class="flex items-center whitespace-nowrap px-2.5 py-0.5 rounded-full border text-xs font-semibold" :class="getMoodStyle(entry.mood)">
                      {{ getMoodIcon(entry.mood) }} <span class="ml-1 capitalize">{{ entry.mood }}</span>
                    </span>
                    <button 
                      @click="journalStore.removeEntry(entry.id)"
                      class="text-rose-300 hover:text-rose-100 transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete Entry"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p class="text-neutral-700 whitespace-pre-wrap leading-relaxed">{{ entry.content }}</p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </BaseCard>
  </div>
</template>

<style>
/* Override styles for components inside the purple container */
.journal-purple-container .text-neutral-500,
.journal-purple-container .text-neutral-800,
.journal-purple-container .text-neutral-900,
.journal-purple-container .text-neutral-600,
.journal-purple-container .text-neutral-400,
.journal-purple-container .text-neutral-700 {
  color: #ffffff !important;
}

/* Glassmorphism for boxes (New Entry Form, Journal History Items, Dropdown) */
.journal-purple-container .bg-white,
.journal-purple-container .bg-neutral-50 {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
  backdrop-filter: blur(8px);
}

.journal-purple-container .bg-white.hover\:bg-neutral-50:hover,
.journal-purple-container .hover\:bg-neutral-50:hover,
.journal-purple-container .hover\:bg-neutral-200:hover {
  background-color: rgba(255, 255, 255, 0.3) !important;
}

/* Specific for hover states on journal entries */
.journal-purple-container .journal-entry-item:hover {
  background-color: rgba(255, 255, 255, 0.3) !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
}

/* Textarea styling */
.journal-purple-container textarea {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
  color: #ffffff !important;
}
.journal-purple-container textarea:focus {
  background-color: rgba(255, 255, 255, 0.3) !important;
  border-color: rgba(255, 255, 255, 0.6) !important;
}
.journal-purple-container textarea::placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* Fix custom mood input */
.journal-purple-container input[placeholder="Feeling"] {
  color: #ffffff !important;
}
.journal-purple-container input[placeholder="Feeling"]::placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* Mood buttons text color (both active and inactive) */
.journal-purple-container button {
  color: #ffffff !important;
}

/* Active mood buttons and badges */
.journal-purple-container .bg-emerald-100,
.journal-purple-container .bg-yellow-100,
.journal-purple-container .bg-indigo-100,
.journal-purple-container .bg-teal-100,
.journal-purple-container .bg-neutral-100,
.journal-purple-container .bg-stone-100,
.journal-purple-container .bg-orange-100,
.journal-purple-container .bg-rose-100,
.journal-purple-container .bg-red-100,
.journal-purple-container .bg-pink-100,
.journal-purple-container .bg-violet-100 {
  background-color: rgba(255, 255, 255, 0.3) !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  color: #ffffff !important;
}

/* Borders */
.journal-purple-container .border-neutral-200,
.journal-purple-container .border-neutral-300 {
  border-color: rgba(255, 255, 255, 0.3) !important;
}
</style>
