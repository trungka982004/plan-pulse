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
</script>

<template>
  <div class="habit-item group">
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
      <span
        v-else
        @dblclick="startEdit"
        class="habit-text cursor-pointer"
        :class="[
          habit.done
            ? 'line-through text-slate-400'
            : 'text-slate-900 font-medium'
        ]"  
      >
        {{ habit.text }}
      </span>
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
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.habit-item {
  @apply flex items-center gap-3 p-4 rounded-lg bg-white border border-slate-200 hover:border-sky-400 hover:shadow-md transition-all duration-200;
}

.habit-input {
  @apply bg-slate-50 border-b-2 border-sky-500 outline-none px-2 py-1 text-sm font-medium text-slate-900 transition-all duration-200;
}

.habit-text {
  @apply block text-sm transition-all duration-200;
}

.habit-action-button {
  @apply p-2 opacity-0 group-hover:opacity-100 transition-opacity;
}

.habit-icon {
  @apply w-5 h-5;
}
</style>
