import Vue from "vue"
import Router from "vue-router"

import Layout from "@/layout"

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    // redirect: '/dashboard',
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export default router