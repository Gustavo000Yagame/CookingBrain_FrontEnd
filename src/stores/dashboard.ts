import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DashboardData } from '@/interface/api'
import { dashboardService } from '@/services/dashboard.service'

export const useDashboardStore = defineStore('dashboard', () => {
  const data = ref<DashboardData | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const lastFetch = ref<Date | null>(null)

  async function fetch(force = false) {
    // Evita refetch desnecessário dentro de 2 minutos
    if (!force && lastFetch.value) {
      const diff = Date.now() - lastFetch.value.getTime()
      if (diff < 2 * 60 * 1000) return
    }

    loading.value = true
    error.value = null

    try {
      data.value = await dashboardService.fetchDashboard()
      lastFetch.value = new Date()
    } catch (e: any) {
      error.value = e?.message ?? 'Falha ao carregar dados do dashboard.'
    } finally {
      loading.value = false
    }
  }

  function reset() {
    data.value = null
    error.value = null
    lastFetch.value = null
  }

  return { data, loading, error, lastFetch, fetch, reset }
})
