import { createRouter, createWebHistory } from "vue-router"
import DashboardView from "../views/DashboardView.vue"
import GoalsView from "../views/GoalsView.vue"
import HabitsView from "../views/HabitsView.vue"
import SettingView from "../views/SettingView.vue"
const routes = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardView
  },
  {
    path: "/goals",
    name: "goals",
    component: GoalsView
  },
  {
    path: "/habits",
    name: "habits",
    component: HabitsView
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