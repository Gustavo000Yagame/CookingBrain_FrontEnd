<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import ChartCard from '@/components/dashboard/ChartCard.vue'
import VendasChart from '@/components/dashboard/VendasChart.vue'
import ProdutosChart from '@/components/dashboard/ProdutosChart.vue'
import StatusPedidosChart from '@/components/dashboard/StatusPedidosChart.vue'
import KpiCard from '@/components/dashboard/KpiCard.vue'

const store = useDashboardStore()
const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

onMounted(() => store.fetch())
</script>

<template>
  <div class="page">
    <h1 class="page-title">Relatórios</h1>

    <section class="kpi-row">
      <KpiCard label="Faturamento Total" :value="store.data ? fmt(store.data.financeiro.faturamentoMensal) : '—'" accent="green" :loading="store.loading" />
      <KpiCard label="Ticket Médio" :value="store.data ? fmt(store.data.financeiro.ticketMedio) : '—'" accent="blue" :loading="store.loading" />
      <KpiCard label="Total de Pedidos" :value="store.data?.pedidos.total ?? '—'" accent="violet" :loading="store.loading" />
      <KpiCard label="Clientes" :value="store.data?.clientesAtendidos ?? '—'" accent="amber" :loading="store.loading" />
    </section>

    <div class="charts-col">
      <ChartCard title="Pedidos por Status" :loading="store.loading">
        <StatusPedidosChart v-if="store.data?.pedidos" :resumo="store.data.pedidos" />
        <p v-else class="empty-state">Sem dados disponíveis.</p>
      </ChartCard>

      <ChartCard title="Produtos Mais Pedidos" :loading="store.loading">
        <ProdutosChart v-if="store.data?.produtosMaisVendidos?.length" :produtos="store.data.produtosMaisVendidos" />
        <p v-else class="empty-state">Sem dados disponíveis.</p>
      </ChartCard>

      <ChartCard title="Faturamento ao Longo do Tempo" :loading="store.loading">
        <VendasChart v-if="store.data?.vendasPorDia?.length" :vendas="store.data.vendasPorDia" />
        <p v-else class="empty-state">Histórico disponível quando o backend expor datas nos pedidos.</p>
      </ChartCard>
    </div>
  </div>
</template>

<style scoped>
.page { display: flex; flex-direction: column; gap: 24px; }
.page-title { font-size: 20px; font-weight: 700; color: #0f172a; }
.kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.charts-col { display: flex; flex-direction: column; gap: 16px; }
.empty-state { font-size: 13px; color: #94a3b8; text-align: center; padding: 32px 0; }
@media (max-width: 900px) { .kpi-row { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .kpi-row { grid-template-columns: 1fr; } }
</style>
