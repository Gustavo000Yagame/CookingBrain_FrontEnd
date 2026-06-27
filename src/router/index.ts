import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardLayout from '../views/DashboardLayout.vue'
import { supabase } from '@/services/supabase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guestOnly: true },
    },
    {
      path: '/dashboard',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
        },
        {
          path: 'pedidos',
          name: 'dashboard-pedidos',
          component: () => import('../views/dashboard/PedidosView.vue'),
        },
        {
          path: 'produtos',
          name: 'dashboard-produtos',
          component: () => import('../views/dashboard/ProdutosView.vue'),
        },
        {
          path: 'clientes',
          name: 'dashboard-clientes',
          component: () => import('../views/dashboard/ClientesView.vue'),
        },
        {
          path: 'relatorios',
          name: 'dashboard-relatorios',
          component: () => import('../views/dashboard/RelatoriosView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/PaginaNaoEncontrado.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  const { data } = await supabase.auth.getSession()
  const isAuthenticated = !!data.session

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && isAuthenticated) {
    return { name: 'dashboard' }
  }
})

export default router
