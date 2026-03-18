<script setup>
defineProps({
  checked: {
    type: Boolean,
    default: false
  }
})  

defineEmits(['toggle'])
</script>
<template>
    <div
      @click="$emit('toggle')"
      class="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-md border-2 transition-all duration-200"
      :class="[
        checked
          ? 'bg-green-500 border-green-500 dark:bg-emerald-500 dark:border-emerald-500'
          : 'border-slate-300 dark:border-slate-600 hover:border-sky-500 dark:hover:border-sky-400 cursor-pointer'
      ]"
    >
      <svg
        v-if="checked"
        class="checkbox-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.checkbox-icon {
  @apply w-4 h-4 text-white;
}
</style>
