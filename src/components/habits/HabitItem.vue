<script setup>
import { ref, nextTick } from "vue"
import { useHabitStore } from "../../stores/habitStore"
import BaseButton from "../base/BaseButton.vue"
import BaseCheckBox from "../base/BaseCheckBox.vue"

const props = defineProps({
  habit: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      text: '',
      done: false
    }),
    validator: (value) => {
      return typeof value.id === 'number' && typeof value.text === 'string' && typeof value.done === 'boolean'
    }
  }
})

const habitStore = useHabitStore()
const { toggleHabit, editHabit, removeHabit } = habitStore

// State for editing
const isEditing = ref(false)
const isSaving = ref(false)
const editText = ref(props.habit.text)
const inputRef = ref(null)

const startEdit = async () => {
  editText.value = props.habit.text
  isEditing.value = true
  // Focus input after DOM updates
  await nextTick()
  inputRef.value?.focus()
}

const saveEdit = () => {
  if (isSaving.value) return;
  isSaving.value = true;

  if (editText.value.trim() && editText.value !== props.habit.text) {
    editHabit(props.habit.id, editText.value)
  }
  isEditing.value = false;

  setTimeout(() => isSaving.value = false, 100);
}

const cancelEdit = () => {
  editText.value = props.habit.text
  isEditing.value = false
}

// Calendar tracking
const showCalendar = ref(false)

const getLast30Days = () => {
  const dates = []
  const today = new Date()
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    dates.push({
      date: d.toISOString().split('T')[0],
      day: d.getDate()
    })
  }
  return dates
}

const last30Days = ref(getLast30Days())
</script>

<template>
  <div>
    <div class="habit-item group">
    <!-- Drag Handle -->
    <div v-if="!isEditing" class="drag-handle cursor-move opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 pr-2 -ml-2 flex items-center" title="Drag to reorder">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"/></svg>
    </div>

    <!-- Checkbox (Hidden while editing) -->
    <BaseCheckBox 
      v-if="!isEditing"
      :checked="habit.done"
      @toggle="toggleHabit(habit.id)"
    />

    <!-- Todo Text / Edit Input -->
    <div class="flex-1">
      <input
        v-if="isEditing"
        ref="inputRef"
        v-model="editText"
        @keyup.enter="saveEdit"
        @keyup.esc="cancelEdit"
        @blur="saveEdit"
        class="habit-input"
        :style="{ width: `${Math.max(editText.length + 1, 5)}ch`, maxWidth: '100%' }"
      />
      <div
        v-else
        class="habit-text flex items-center gap-2 w-fit max-w-full flex-wrap"
      >
        <span
          @dblclick="startEdit"
          class="cursor-pointer"
          :class="[
            habit.done
              ? 'line-through text-slate-400 dark:text-slate-500'
              : 'text-slate-900 dark:text-slate-100 font-medium'
          ]"  
        >
          {{ habit.text }}
        </span>
        <span v-if="habit.streak > 0" class="text-orange-500 dark:text-orange-400 text-xs font-bold inline-flex items-center justify-center shrink-0 w-max bg-orange-50 dark:bg-orange-900/40 px-2 py-0.5 rounded-full border border-orange-200 dark:border-orange-800 transition-colors" title="Current Streak">
          🔥 {{ habit.streak }}
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-1">
      <!-- Normal Mode Buttons -->
      <template v-if="!isEditing">
        <BaseButton 
          variant="modify" 
          @click="startEdit" 
          class="habit-action-button"
          title="Edit"
        >
          <svg class="habit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
          </svg>
        </BaseButton>
        
        <BaseButton 
          variant="danger" 
          @click="removeHabit(habit.id)" 
          class="habit-action-button"
          title="Delete"
        >
          <svg class="habit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </BaseButton>
      </template>

      <!-- Editing Mode Buttons -->
      <template v-else>
        <BaseButton 
          variant="primary" 
          @click="saveEdit" 
          class="habit-action-button"
          title="Save"
        >
          <svg class="habit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </BaseButton>
        
        <BaseButton 
          variant="danger" 
          @click="cancelEdit" 
          class="habit-action-button"
          title="Cancel"
        >
          <svg class="habit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </BaseButton>
      </template>
      
      <!-- Show Calendar Button -->
      <BaseButton 
        v-if="!isEditing"
        variant="primary" 
        @click="showCalendar = !showCalendar" 
        class="p-2 transition-opacity"
        :class="[ showCalendar ? 'opacity-100 bg-slate-100 dark:bg-slate-700' : 'opacity-0 group-hover:opacity-100' ]"
        title="Habit Calendar"
      >
        <svg class="habit-icon" :class="{ 'text-sky-500': showCalendar }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      </BaseButton>
    </div>
  </div>

  <!-- Calendar Activity Box -->
  <div v-if="showCalendar" class="pl-4 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-t-0 border-slate-200 dark:border-slate-700 rounded-b-lg -mt-2 mb-2 transition-colors duration-200">
    <div class="flex items-center justify-between mb-2">
      <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Last 30 Days</span>
      <span class="text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
        {{ (habit.completedDates || []).length }} completions
      </span>
    </div>
    <div class="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-15 gap-1.5">
      <div 
        v-for="day in last30Days" 
        :key="day.date"
        class="w-6 h-6 rounded flex items-center justify-center text-[10px] font-medium transition-colors cursor-help"
        :class="[
          (habit.completedDates || []).includes(day.date)
            ? 'bg-emerald-400 dark:bg-emerald-500/80 text-white hover:bg-emerald-500 dark:hover:bg-emerald-500'
            : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600'
        ]"
        :title="day.date"
      >
        {{ day.day }}
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.habit-item {
  @apply flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-md transition-all duration-200;
}

.habit-input {
  @apply bg-slate-50 dark:bg-slate-900 border-b-2 border-sky-500 outline-none px-2 py-1 text-sm font-medium text-slate-900 dark:text-slate-100 transition-all duration-200;
}

.habit-text {
  @apply block text-sm transition-all duration-200 dark:text-slate-100;
}

.habit-action-button {
  @apply p-2 opacity-0 group-hover:opacity-100 transition-opacity;
}

.habit-icon {
  @apply w-5 h-5;
}
</style>
