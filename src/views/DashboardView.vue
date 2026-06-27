<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import KpiCard from '@/components/dashboard/KpiCard.vue'
import ChartCard from '@/components/dashboard/ChartCard.vue'
import StatusPedidosChart from '@/components/dashboard/StatusPedidosChart.vue'
import VendasChart from '@/components/dashboard/VendasChart.vue'
import ProdutosChart from '@/components/dashboard/ProdutosChart.vue'
import ErrorBanner from '@/components/dashboard/ErrorBanner.vue'

const store = useDashboardStore()

onMounted(() => store.fetch())

const fmt = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

const now = computed(() => {
  const d = new Date()
  return d.toLocaleDateString('pt-BR', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
  })
})

const hasVendas   = computed(() => (store.data?.vendasPorDia?.length ?? 0) > 0)
const hasProdutos = computed(() => (store.data?.produtosMaisVendidos?.length ?? 0) > 0)
const hasPedidos  = computed(() => !!store.data?.pedidos)
</script>

<template>
  <div class="dash-inner">
    <header class="dash-header">
      <div>
        <h1 class="page-title">Visão Geral</h1>
        <p class="page-date">{{ now }}</p>
      </div>
      <button
        class="refresh-btn"
        :disabled="store.loading"
        @click="store.fetch(true)"
        title="Atualizar dados"
      >
        <svg
          width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2"
          :class="{ spinning: store.loading }"
        >
          <polyline points="23 4 23 10 17 10"/>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
        </svg>
        Atualizar
      </button>
    </header>

    <ErrorBanner v-if="store.error" :message="store.error" @retry="store.fetch(true)" />

    <section class="kpi-grid">
      <KpiCard label="Faturamento Diário" :value="store.data ? fmt(store.data.financeiro.faturamentoDiario) : ''" accent="blue" :loading="store.loading" />
      <KpiCard label="Faturamento Semanal" :value="store.data ? fmt(store.data.financeiro.faturamentoSemanal) : ''" accent="violet" :loading="store.loading" />
      <KpiCard label="Faturamento Total" :value="store.data ? fmt(store.data.financeiro.faturamentoMensal) : ''" accent="green" :loading="store.loading" />
      <KpiCard label="Ticket Médio" :value="store.data ? fmt(store.data.financeiro.ticketMedio) : ''" accent="amber" :loading="store.loading" />
    </section>

    <section class="kpi-grid kpi-grid--5">
      <KpiCard label="Total de Pedidos" :value="store.data?.pedidos.total ?? ''" accent="blue" :loading="store.loading" />
      <KpiCard label="Pendentes" :value="store.data?.pedidos.pendentes ?? ''" accent="amber" :loading="store.loading" />
      <KpiCard label="Em Preparo" :value="store.data?.pedidos.emPreparo ?? ''" accent="blue" :loading="store.loading" />
      <KpiCard label="Entregues" :value="store.data?.pedidos.entregues ?? ''" accent="green" :loading="store.loading" />
      <KpiCard label="Clientes" :value="store.data?.clientesAtendidos ?? ''" accent="violet" :loading="store.loading" />
    </section>

    <section class="charts-grid">
      <ChartCard title="Faturamento e Pedidos por Dia" class="chart-wide" :loading="store.loading">
        <VendasChart v-if="hasVendas" :vendas="store.data!.vendasPorDia" />
      </ChartCard>

      <ChartCard title="Pedidos por Status" :loading="store.loading">
        <StatusPedidosChart v-if="hasPedidos" :resumo="store.data!.pedidos" />
      </ChartCard>

      <ChartCard title="Produtos Mais Pedidos" :loading="store.loading">
        <ProdutosChart v-if="hasProdutos" :produtos="store.data!.produtosMaisVendidos" />
      </ChartCard>
    </section>
  </div>
</template>

<style scoped>
.dash-inner { display: flex; flex-direction: column; gap: 24px; }

.dash-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.page-title { font-size: 22px; font-weight: 700; color: #0f172a; letter-spacing: -0.4px; }
.page-date { font-size: 12px; color: #94a3b8; margin-top: 2px; text-transform: capitalize; }

.refresh-btn { display: flex; align-items: center; gap: 6px; background: #fff; border: 1px solid #e2e8f0; color: #475569; border-radius: 8px; padding: 8px 14px; font-size: 13px; font-weight: 500; cursor: pointer; transition: background 0.15s; }
.refresh-btn:hover:not(:disabled) { background: #f1f5f9; }
.refresh-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.spinning { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.kpi-grid--5 { grid-template-columns: repeat(5, 1fr); }

.charts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.chart-wide { grid-column: 1 / -1; }


@media (max-width: 1100px) { .kpi-grid--5 { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 900px) {
  .kpi-grid { grid-template-columns: repeat(2, 1fr); }
  .kpi-grid--5 { grid-template-columns: repeat(2, 1fr); }
  .charts-grid { grid-template-columns: 1fr; }
  .chart-wide { grid-column: auto; }
}
@media (max-width: 480px) { .kpi-grid, .kpi-grid--5 { grid-template-columns: 1fr; } }
</style>
