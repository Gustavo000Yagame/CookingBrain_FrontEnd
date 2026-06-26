import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import PaginaNaoEncontrado from '../views/PaginaNaoEncontrado.vue'
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
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      component: PaginaNaoEncontrado,
    },
    {
      path: '/services',
      name: 'services',
      component: PaginaNaoEncontrado,
    },
    {
      path: '/contact',
      name: 'contact',
      component: PaginaNaoEncontrado,
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
