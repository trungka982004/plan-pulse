import { defineStore } from "pinia"

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: []
  }),

  actions: {
    addTodo(text) {
      this.todos.push({
        id: Date.now(),
        text,
        done: false
      })
    }, 

    toggleTodo(id) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) todo.done = !todo.done
    }, 

    removeTodo(id) { 
      this.todos = this.todos.filter(t => t.id !== id)
    } 
  }
})