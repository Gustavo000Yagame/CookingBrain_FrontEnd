<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { pedidosService, type PedidoResponse } from '@/services/pedidos.service'
import { pratosService } from '@/services/produtos.service'

const pedidos = ref<PedidoResponse[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const savingId = ref<number | null>(null)

const statusOrder = ['PENDENTE', 'EM_PREPARO', 'PRONTO', 'ENTREGUE', 'CANCELADO']

const normalizeStatus = (value?: string | null) => (value ?? '').toString().trim().toUpperCase()

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

const updatePedidoStatus = (id: number, status: string) => {
  const index = pedidos.value.findIndex(p => p.idPedido === id)
  const pedidoAtual = pedidos.value[index]
  if (pedidoAtual) {
    pedidoAtual.status = status
  }
}

const handleAlterarStatus = async (pedido: PedidoResponse) => {
  if (savingId.value === pedido.idPedido) return

  const nextStatus = getNextStatus(pedido.status)

  try {
    savingId.value = pedido.idPedido
    const atualizado = await pedidosService.alterarStatus(pedido.idPedido, nextStatus)
    updatePedidoStatus(pedido.idPedido, atualizado.status ?? nextStatus)
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

const enrichProdutos = async () => {
  const promises = pedidos.value.map(async p => {
    if (!p.itens?.length) return
    await Promise.all(p.itens.map(async item => {
      if (!item.nome) {
        try {
          const prato = await pratosService.buscarPorId(item.idPrato)
          item.nome = prato.nome
        } catch { /* ignore */ }
      }
    }))
  })
  await Promise.all(promises)
}

onMounted(async () => {
  // enrich after initial load
  await enrichProdutos()
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
            <th>Produtos</th>
            <th>Forma de Pagamento</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in pedidos" :key="p.idPedido">
            <td class="id-cell">{{ p.idPedido }}</td>
            <td>{{ p.nome }}</td>
            <td>
              <div v-if="p.itens?.length" class="products-list">
                <span v-for="item in p.itens" :key="`${p.idPedido}-${item.idPrato}`" class="product-chip">
                  {{ item.nome }}<span v-if="item.quantidade"> × {{ item.quantidade }}</span>
                </span>
              </div>
              <span v-else class="muted">—</span>
            </td>
            <td>{{ p.formpag }}</td>
            <td>
              <div class="status-stack">
                <span
                  class="badge"
                  :style="{ background: getStatusBadge(p.status).color + '22', color: getStatusBadge(p.status).color }"
                >
                  {{ getStatusBadge(p.status).label }}
                </span>
                <button class="status-btn" :disabled="savingId === p.idPedido" @click="handleAlterarStatus(p)">
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
.products-list { display: flex; flex-wrap: wrap; gap: 6px; }
.product-chip { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 999px; background: #f8fafc; color: #475569; font-size: 11px; }
.muted { color: #94a3b8; font-size: 12px; }
.loading-rows { display: flex; flex-direction: column; gap: 8px; }
.skeleton-row { height: 48px; border-radius: 8px; background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
.error-box { background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; border-radius: 8px; padding: 14px 16px; font-size: 13px; }
</style>
