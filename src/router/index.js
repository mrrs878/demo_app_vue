import Vue from 'vue'
import VueRouter from 'vue-router'

import recommendRoutes from './recommrnd'

Vue.use(VueRouter)

const routes = [
  ...recommendRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
