<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { pratosService, type PratoResponse } from '@/services/produtos.service'

const pratos = ref<PratoResponse[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    pratos.value = await pratosService.listar()
  } catch (e: any) {
    error.value = e?.message ?? 'Erro ao carregar produtos.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="page">
    <h1 class="page-title">Produtos (Pratos)</h1>

    <div v-if="loading" class="loading-rows">
      <div v-for="i in 5" :key="i" class="skeleton-row" />
    </div>

    <div v-else-if="error" class="error-box">{{ error }}</div>

    <div v-else-if="pratos.length === 0" class="empty">
      Nenhum prato cadastrado ainda.
    </div>

    <div v-else class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Descricao</th>
            <th>Preco</th>
            <th>Pedidos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in pratos" :key="p.idPrato">
            <td class="id-cell">{{ p.idPrato }}</td>
            <td class="bold-cell">{{ p.nome }}</td>
            <td class="desc-cell">{{ p.descricao }}</td>
            <td>{{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.preco) }}</td>
            <td>
              <span class="count-badge">{{ p.pedidos?.length ?? 0 }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.page { display: flex; flex-direction: column; gap: 20px; }
.page-title { font-size: 20px; font-weight: 700; color: #0f172a; }
.table-wrap { background: #fff; border-radius: 12px; border: 1px solid #e8eaf0; overflow: hidden; }
.data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.data-table thead { background: #f8fafc; }
.data-table th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: #6b7280; border-bottom: 1px solid #e8eaf0; }
.data-table td { padding: 13px 16px; color: #374151; border-bottom: 1px solid #f1f5f9; }
.data-table tbody tr:last-child td { border-bottom: none; }
.data-table tbody tr:hover td { background: #f8fafc; }
.id-cell { color: #9ca3af; font-size: 12px; }
.bold-cell { font-weight: 600; color: #111827; }
.desc-cell { color: #6b7280; max-width: 240px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.count-badge { background: #eff6ff; color: #2563eb; border-radius: 100px; padding: 2px 10px; font-size: 11px; font-weight: 600; }
.loading-rows { display: flex; flex-direction: column; gap: 8px; }
.skeleton-row { height: 48px; border-radius: 8px; background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
.error-box { background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; border-radius: 8px; padding: 14px 16px; font-size: 13px; }
.empty { background: #fff; border-radius: 12px; border: 1px dashed #e2e8f0; padding: 48px; text-align: center; color: #94a3b8; font-size: 13px; }
</style>
