import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/marca',
    name: 'marca-lista',
    component: () => import('../views/marca/MarcaListaView.vue')
  },
  {
    path: '/marcacadastra',
    name: 'marca-cadastra',
    component: () => import('../views/marca/MarcaCadastraView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
