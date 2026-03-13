import { defineStore } from "pinia"
import { ref,computed  } from 'vue'

export const useTodoStore = defineStore("todo", () => {
  // State
  const todos = ref([])
  const filter = ref('all')

  //Getters
  const filteredTodos = computed(() => {
    if (filter.value === "active") return todos.value.filter((t) => !t.done)
    if (filter.value === "completed") return todos.value.filter((t) => t.done)
    return todos.value
  })

  const totalCount = computed(() => todos.value.length)
  const completedCount = computed(() => todos.value.filter(t => t.done).length)

  const progress = computed(() => {
    if (totalCount.value === 0) return 0
    return Math.round((completedCount.value / totalCount.value) * 100)
  })

  // Actions
  const addTodo = (title) => {
    if(title.trim()) {
      todos.value.push({
        id: Date.now(),
        text: title,
        done: false
      })
    }
  }

  const editTodo = (id, updateText) => {
    const todo = todos.value.find(t => t.id === id)
    if(todo && updateText.trim()) {
      todo.text = updateText
    }
  }

  const toggleTodo = (id) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) todo.done = !todo.done
  }

  const removeTodo = (id) => {
    todos.value = todos.value.filter(t => t.id !== id)
  }

  const clearAll = () => {
    todos.value = []
  }

  const setFilter = (newFilter) => {
    filter.value = newFilter
  }

  // Return component in reuse 
  return {
    //states
    todos,
    filter,
    //getters
    filteredTodos,
    totalCount,
    completedCount,
    progress,
    //actions
    addTodo,
    editTodo,
    toggleTodo,
    removeTodo,
    clearAll,
    setFilter
  }
})