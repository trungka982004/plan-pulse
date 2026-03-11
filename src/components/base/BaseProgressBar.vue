<script setup>
import { computed } from "vue"

const props = defineProps({
  progress: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 100
  },
  label: {
    type: String,
    default: "Progress"
  }
})

const barColor = computed(() => {
  if (props.progress <= 25) return 'bg-rose-500'
  if (props.progress <= 50) return 'bg-amber-400'
  if (props.progress <= 70) return 'bg-orange-500'
  return 'bg-emerald-500'
})
</script>

<template>
  <div class="space-y-2 progress-bar">
    <div class="flex justify-between text-xs font-medium text-slate-500 uppercase tracking-wider">
      <span>{{ label }}</span>
      <span :class="barColor.replace('bg-', 'text-')" class="font-bold transition-colors duration-300">
        {{ progress }}%
      </span>
    </div>
    <div class="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
      <div 
        class="h-full transition-all duration-500 ease-out"
        :class="barColor"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.progress-bar {
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>