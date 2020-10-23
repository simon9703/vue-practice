import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PCRouter from './pc'
import PHRouter from './ph'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  ...PCRouter,
  ...PHRouter
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
