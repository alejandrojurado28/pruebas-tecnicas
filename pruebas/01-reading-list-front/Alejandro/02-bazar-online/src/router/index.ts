import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResultadosView from '../views/ResultadosView.vue';
import DetallesView from '@/views/DetallesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/items',
      name: 'Items',
      component: ResultadosView,
      props: true
    },
    {
      path: '/items/:id',
      name: 'Detalles',
      component: DetallesView,
      props: true
    }
  ]
})

export default router
