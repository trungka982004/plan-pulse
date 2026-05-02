<script setup>
import { computed } from 'vue'
import draggable from 'vuedraggable'
import { useGoalStore } from '../../stores/goalStore'

const props = defineProps({
  goal: {
    type: Object,
    required: true
  }
})

const goalStore = useGoalStore()

const createListComputed = (status) => {
  return computed({
    get: () => (props.goal.milestones || []).filter(m => m.status === status),
    set: (newItems) => {
      // vuedraggable handles the DOM array via v-model,
      // but we need to update the status in the store when an item moves.
      // This is handled via the @change event, so we just return the newItems here
      // or do nothing if we don't want local state divergence.
    }
  })
}

const todoList = createListComputed('pending')
const inProgressList = createListComputed('in_progress')
const doneList = createListComputed('completed')

const onDragChange = (event, newStatus) => {
  if (event.added) {
    const milestone = event.added.element
    goalStore.updateMilestoneStatus(props.goal.id, milestone.id, newStatus)
  }
}

const removeMilestone = (milestoneId) => {
  goalStore.removeMilestone(props.goal.id, milestoneId)
}
</script>

<template>
  <div class="kanban-board grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 pb-2">
    <!-- TODO Column -->
    <div class="kanban-column bg-neutral-100 dark:bg-neutral-800/80 rounded-lg p-3">
      <h4 class="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3 flex items-center justify-between">
        To Do
        <span class="bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 px-2 py-0.5 rounded-full">{{ todoList.length }}</span>
      </h4>
      <draggable 
        v-model="todoList" 
        group="milestones" 
        item-key="id"
        @change="e => onDragChange(e, 'pending')"
        class="kanban-list min-h-[50px]"
      >
        <template #item="{ element }">
          <div class="kanban-card group/card">
            <span class="text-sm text-neutral-700 dark:text-neutral-200">{{ element.title }}</span>
            <button @click="removeMilestone(element.id)" class="text-red-400 opacity-0 group-hover/card:opacity-100 transition-opacity">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </template>
      </draggable>
    </div>

    <!-- IN PROGRESS Column -->
    <div class="kanban-column bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
      <h4 class="text-xs font-bold text-blue-500 uppercase tracking-wider mb-3 flex items-center justify-between">
        In Progress
        <span class="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">{{ inProgressList.length }}</span>
      </h4>
      <draggable 
        v-model="inProgressList" 
        group="milestones" 
        item-key="id"
        @change="e => onDragChange(e, 'in_progress')"
        class="kanban-list min-h-[50px]"
      >
        <template #item="{ element }">
          <div class="kanban-card group/card border-blue-200 dark:border-blue-800">
            <span class="text-sm text-blue-900 dark:text-blue-100">{{ element.title }}</span>
            <button @click="removeMilestone(element.id)" class="text-red-400 opacity-0 group-hover/card:opacity-100 transition-opacity">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </template>
      </draggable>
    </div>

    <!-- DONE Column -->
    <div class="kanban-column bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3">
      <h4 class="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3 flex items-center justify-between">
        Done
        <span class="bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">{{ doneList.length }}</span>
      </h4>
      <draggable 
        v-model="doneList" 
        group="milestones" 
        item-key="id"
        @change="e => onDragChange(e, 'completed')"
        class="kanban-list min-h-[50px]"
      >
        <template #item="{ element }">
          <div class="kanban-card group/card border-emerald-200 dark:border-emerald-800 opacity-70">
            <span class="text-sm text-emerald-900 dark:text-emerald-100 line-through">{{ element.title }}</span>
            <button @click="removeMilestone(element.id)" class="text-red-400 opacity-0 group-hover/card:opacity-100 transition-opacity">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.kanban-list {
  @apply flex flex-col gap-2;
}

.kanban-card {
  @apply bg-white dark:bg-neutral-900 p-2 rounded border border-neutral-200 dark:border-neutral-700 shadow-sm cursor-move flex justify-between items-start;
}

.kanban-card:hover {
  @apply shadow-md border-primary-300 dark:border-primary-600;
}
</style>
