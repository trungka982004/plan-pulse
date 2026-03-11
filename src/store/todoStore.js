import { defineStore } from "pinia"

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
    filter: "all"
  }),
  
  getters: {
    filteredTodos: (state) => {
      if (state.filter === "active") {
        return state.todos.filter((t) => !t.done)
      }
      if (state.filter === "completed") {
        return state.todos.filter((t) => t.done)
      }
      return state.todos
    },
    totalCount: (state) => state.todos.length,
    completedCount: (state) => state.todos.filter((t) => t.done).length,
    progress: (state) => {
      if (state.todos.length === 0) return 0
      return Math.round(
        (state.todos.filter((t) => t.done).length / state.todos.length) * 100
      )
    }
  },

  actions: {
    addTodo(text) {
      this.todos.push({
        id: Date.now(),
        text,
        done: false
      })
    }, 
    editTodo(id, updateText) {
      const todo = this.todos.find(t => t.id === id)
      if(todo && updateText.trim()) {
        todo.text = updateText
      }
    },
    toggleTodo(id) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) todo.done = !todo.done
    }, 

    removeTodo(id) { 
      this.todos = this.todos.filter(t => t.id !== id)
    },

    clearAll() {
      this.todos = []
    },

    setFilter(filter) {
      this.filter = filter
    }
  }
})