import Vue from 'vue'
import VueRouter from 'vue-router'

import recommendRoutes from './recommrnd'
import playerRoutes from './player'

Vue.use(VueRouter)

const routes = [
  ...recommendRoutes,
  ...playerRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
