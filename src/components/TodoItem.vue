<script setup>
import { ref, nextTick } from "vue"
import { useTodoStore } from "../store/todoStore"
import BaseButton from "./base/BaseButton.vue"
import BaseCheckBox from "./base/BaseCheckBox.vue"

const props = defineProps({
  todo: {
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

const todoStore = useTodoStore()
const { toggleTodo, editTodo, removeTodo } = todoStore

// State for editing
const isEditing = ref(false)
const editText = ref(props.todo.text)
const inputRef = ref(null)

const startEdit = async () => {
  editText.value = props.todo.text
  isEditing.value = true
  // Focus input after DOM updates
  await nextTick()
  inputRef.value?.focus()
}

const saveEdit = () => {
  if (editText.value.trim()) {
    editTodo(props.todo.id, editText.value)
    isEditing.value = false
  } else {
    cancelEdit()
  }
}

const cancelEdit = () => {
  editText.value = props.todo.text
  isEditing.value = false
}
</script>

<template>
  <div class="todo-item group">
    <!-- Checkbox (Hidden while editing) -->
    <BaseCheckBox 
      v-if="!isEditing"
      :checked="todo.done"
      @toggle="toggleTodo(todo.id)"
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
        class="todo-input"
      />
      <span
        v-else
        class="todo-text"
        :class="[
          todo.done
            ? 'line-through text-slate-400'
            : 'text-slate-900 font-medium'
        ]"
      >
        {{ todo.text }}
      </span>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-1">
      <!-- Normal Mode Buttons -->
      <template v-if="!isEditing">
        <BaseButton 
          variant="modify" 
          @click="startEdit" 
          class="todo-action-button"
          title="Edit"
        >
          <svg class="todo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
          </svg>
        </BaseButton>
        
        <BaseButton 
          variant="danger" 
          @click="removeTodo(todo.id)" 
          class="todo-action-button"
          title="Delete"
        >
          <svg class="todo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </BaseButton>
      </template>

      <!-- Editing Mode Buttons -->
      <template v-else>
        <BaseButton 
          variant="primary" 
          @click="saveEdit" 
          class="todo-action-button"
          title="Save"
        >
          <svg class="todo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </BaseButton>
        
        <BaseButton 
          variant="danger" 
          @click="cancelEdit" 
          class="todo-action-button"
          title="Cancel"
        >
          <svg class="todo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </BaseButton>
      </template>
    </div>
  </div>
</template>

<style scoped>
@reference "../assets/main.css";

.todo-item {
  @apply flex items-center gap-3 p-4 rounded-lg bg-white border border-slate-200 hover:border-sky-400 hover:shadow-md transition-all duration-200;
}

.todo-input {
  @apply w-full bg-slate-50 border-b-2 border-sky-500 outline-none px-2 py-1 text-sm font-medium text-slate-900;
}

.todo-text {
  @apply block text-sm transition-all duration-200;
}

.todo-action-button {
  @apply p-2 opacity-0 group-hover:opacity-100 transition-opacity;
}

.todo-icon {
  @apply w-5 h-5;
}
</style>