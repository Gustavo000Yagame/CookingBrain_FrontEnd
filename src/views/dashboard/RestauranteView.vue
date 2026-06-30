<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { restaurantesService, type RestauranteResponse } from '@/services/restaurantes.service'
import { RouterLink } from 'vue-router'

const restaurantes = ref<RestauranteResponse[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    restaurantes.value = await restaurantesService.listar()
  } catch (e: any) {
    error.value = e?.message ?? 'Erro ao carregar restaurantes'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="page">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-slate-900">Restaurantes</h1>
      <RouterLink to="/atalho-secreto" class="text-sm text-gray-500 hover:text-gray-700">Atalho</RouterLink>
    </div>

    <div v-if="loading" class="mt-6">Carregando...</div>
    <div v-else-if="error" class="mt-6 text-red-600">{{ error }}</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      <article v-for="r in restaurantes" :key="r.idRestaurante" class="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
        <h3 class="font-semibold text-slate-900">{{ r.nome }}</h3>
        <p class="text-sm text-gray-500 mt-1">{{ r.categoria ?? '—' }}</p>
        <p class="text-sm text-gray-600 mt-3">{{ r.endereco ?? 'Endereço não informado' }}</p>
        <div class="mt-4 flex items-center justify-between">
          <div class="text-sm text-gray-500">{{ r.telefone ?? '—' }}</div>
          <RouterLink to="/dashboard/restaurante" class="text-sm text-blue-600 hover:underline">Abrir</RouterLink>
        </div>
      </article>
    </div>

    <div class="mt-6 text-right">
      <RouterLink to="/atalho-secreto" class="text-xs text-gray-400 hover:text-gray-600">Página secreta</RouterLink>
    </div>
  </div>
</template>

