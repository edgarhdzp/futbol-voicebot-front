import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import Home from "../views/Home.vue"
import Voicebot from "../views/Voicebot.vue"

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "Home", component: Home },
  { path: "/voicebot", name: "Voicebot", component: Voicebot },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router