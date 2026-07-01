<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { pedidosService, type PedidoResponse } from '@/services/pedidos.service'

const pedidos = ref<PedidoResponse[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const savingId = ref<number | null>(null)

const statusOrder = ['PENDENTE', 'EM_PREPARO', 'PRONTO', 'ENTREGUE', 'CANCELADO']

const normalizeStatus = (value?: string | null) =>
  (value ?? '').toString().trim().toUpperCase()

const statusColor: Record<string, string> = {
  PENDENTE: '#f59e0b',
  EM_PREPARO: '#3b82f6',
  PRONTO: '#22c55e',
  ENTREGUE: '#6b7280',
  CANCELADO: '#f43f5e',
}

const statusLabel: Record<string, string> = {
  PENDENTE: 'Pendente',
  EM_PREPARO: 'Em preparo',
  PRONTO: 'Pronto',
  ENTREGUE: 'Entregue',
  CANCELADO: 'Cancelado',
}

const getStatusBadge = (status?: string | null) => {
  const key = normalizeStatus(status)
  return {
    label: statusLabel[key] ?? status ?? 'Sem status',
    color: statusColor[key] ?? '#6b7280',
  }
}

const getNextStatus = (status?: string | null): string => {
  const key = normalizeStatus(status)
  const currentIndex = statusOrder.indexOf(key)
  return statusOrder[(currentIndex + 1) % statusOrder.length] ?? 'PENDENTE'
}

const handleAlterarStatus = async (pedido: PedidoResponse) => {
  if (savingId.value === pedido.idPedido) return
  const nextStatus = getNextStatus(pedido.status)
  try {
    savingId.value = pedido.idPedido
    const atualizado = await pedidosService.alterarStatus(pedido.idPedido, nextStatus)
    const idx = pedidos.value.findIndex(p => p.idPedido === pedido.idPedido)
    if (idx !== -1) pedidos.value[idx].status = atualizado.status ?? nextStatus
  } catch (e: any) {
    error.value = e?.message ?? 'Erro ao atualizar status.'
  } finally {
    savingId.value = null
  }
}

onMounted(async () => {
  try {
    pedidos.value = await pedidosService.listar()
  } catch (e: any) {
    error.value = e?.message ?? 'Erro ao carregar pedidos.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="page">
    <h1 class="page-title">Pedidos</h1>

    <div v-if="loading" class="loading-rows">
      <div v-for="i in 5" :key="i" class="skeleton-row" />
    </div>

    <div v-else-if="error" class="error-box">{{ error }}</div>

    <div v-else class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Forma de Pagamento</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in pedidos" :key="p.idPedido">
            <td class="id-cell">{{ p.idPedido }}</td>
            <td>{{ p.nome }}</td>
            <td>{{ p.formpag }}</td>
            <td>
              <div class="status-stack">
                <span
                  class="badge"
                  :style="{ background: getStatusBadge(p.status).color + '22', color: getStatusBadge(p.status).color }"
                >
                  {{ getStatusBadge(p.status).label }}
                </span>
                <button
                  class="status-btn"
                  :disabled="savingId === p.idPedido"
                  @click="handleAlterarStatus(p)"
                >
                  {{ savingId === p.idPedido ? 'Salvando...' : 'Alterar status' }}
                </button>
              </div>
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
.badge { padding: 3px 10px; border-radius: 100px; font-size: 11px; font-weight: 600; }
.status-stack { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.status-btn { border: 1px solid #dbe3ee; background: #fff; color: #334155; border-radius: 999px; padding: 5px 10px; font-size: 11px; cursor: pointer; transition: all 0.2s ease; }
.status-btn:hover:not(:disabled) { border-color: #60a5fa; color: #2563eb; }
.status-btn:disabled { opacity: 0.7; cursor: wait; }
.loading-rows { display: flex; flex-direction: column; gap: 8px; }
.skeleton-row { height: 48px; border-radius: 8px; background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
.error-box { background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; border-radius: 8px; padding: 14px 16px; font-size: 13px; }
</style>
