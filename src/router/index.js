import { createRouter, createWebHistory } from "vue-router"
import TodoView from "../views/TodoView.vue"
import SettingView from "../views/SettingView.vue"
const routes = [
  {
    path: "/",
    component: TodoView
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingView
  }
]

const router = createRouter({ 
  history: createWebHistory(),
  routes
}) 

export default router