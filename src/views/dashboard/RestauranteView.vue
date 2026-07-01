<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { restaurantesService, type RestauranteResponse } from '@/services/restaurantes.service'

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
    <h1 class="page-title">Restaurante</h1>

    <div v-if="loading" class="loading-rows">
      <div v-for="i in 3" :key="i" class="skeleton-row" />
    </div>

    <div v-else-if="error" class="error-box">{{ error }}</div>

    <div v-else-if="restaurantes.length === 0" class="empty">
      Nenhum restaurante cadastrado.
    </div>

    <div v-else class="cards-grid">
      <article v-for="r in restaurantes" :key="r.idRestaurante" class="restaurante-card">
        <h3 class="card-nome">{{ r.nome }}</h3>
        <p v-if="r.categoria" class="card-meta">{{ r.categoria }}</p>
        <p v-if="r.endereco" class="card-endereco">{{ r.endereco }}</p>
        <p v-if="r.telefone" class="card-meta">{{ r.telefone }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.page { display: flex; flex-direction: column; gap: 20px; }
.page-title { font-size: 20px; font-weight: 700; color: #0f172a; }
.cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
.restaurante-card { background: #fff; border: 1px solid #e8eaf0; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; gap: 6px; }
.card-nome { font-size: 15px; font-weight: 700; color: #0f172a; margin: 0; }
.card-meta { font-size: 12px; color: #64748b; margin: 0; }
.card-endereco { font-size: 13px; color: #374151; margin: 0; }
.loading-rows { display: flex; flex-direction: column; gap: 8px; }
.skeleton-row { height: 100px; border-radius: 12px; background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
.error-box { background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; border-radius: 8px; padding: 14px 16px; font-size: 13px; }
.empty { text-align: center; padding: 48px; color: #94a3b8; font-size: 13px; }
</style>
