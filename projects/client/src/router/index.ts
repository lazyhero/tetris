import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'TaskBoard',
    component: () => import(/* webpackChunkName: "TaskBoard" */ '../views/TaskBoard/index.vue')
  },
  {
    path: '/task',
    name: 'TaskManage',
    component: () => import(/* webpackChunkName: "TaskManage" */ '../views/Task/index.vue')
  },
  {
    path: '/member',
    name: 'MemberManage',
    component: () => import(/* webpackChunkName: "MemberManage" */ '../views/Member/index.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
