<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { pratosService, type PratoResponse } from '@/services/produtos.service'
import { useMarkup } from '@/composables/useMarkup'
import ChartCard from '@/components/dashboard/ChartCard.vue'
import ProdutosChart from '@/components/dashboard/ProdutosChart.vue'
import StatusPedidosChart from '@/components/dashboard/StatusPedidosChart.vue'
import MarkupChart from '@/components/dashboard/MarkupChart.vue'
import KpiCard from '@/components/dashboard/KpiCard.vue'

const store = useDashboardStore()
const pratos = ref<PratoResponse[]>([])

const { getCusto, calcMarkup, calcMargem, markupMinimo, markupMedioDoCardapio } = useMarkup()

const fmt = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

const markupMedio = computed(() => markupMedioDoCardapio.value(pratos.value))

const pratosComCusto = computed(() =>
  pratos.value.filter(p => getCusto(p.idPrato) > 0)
)

const pratosAbaixo = computed(() =>
  pratosComCusto.value.filter(p => {
    const m = calcMarkup(p.preco, getCusto(p.idPrato))
    return m !== null && m < markupMinimo.value
  }).length
)

const margemMedia = computed(() => {
  const vals = pratosComCusto.value
    .map(p => calcMargem(p.preco, getCusto(p.idPrato)))
    .filter((m): m is number => m !== null)
  if (!vals.length) return null
  return vals.reduce((a, b) => a + b, 0) / vals.length
})

onMounted(async () => {
  store.fetch()
  try { pratos.value = await pratosService.listar() } catch { /* silencioso */ }
})
</script>

<template>
  <div class="page">
    <h1 class="page-title">Relatórios</h1>

    <section class="kpi-row">
      <KpiCard
        label="Faturamento Total"
        :value="store.data ? fmt(store.data.financeiro.faturamentoMensal) : ''"
        accent="green"
        :loading="store.loading"
      />
      <KpiCard
        label="Ticket Médio"
        :value="store.data ? fmt(store.data.financeiro.ticketMedio) : ''"
        accent="blue"
        :loading="store.loading"
      />
      <KpiCard
        label="Total de Pedidos"
        :value="store.loading ? '' : (store.data?.pedidos.total ?? 0)"
        accent="violet"
        :loading="store.loading"
      />
      <KpiCard
        label="Clientes"
        :value="store.loading ? '' : (store.data?.clientesAtendidos ?? 0)"
        accent="amber"
        :loading="store.loading"
      />
    </section>

    <h2 class="section-title">Análise de Markup</h2>

    <section class="kpi-row">
      <KpiCard
        label="Markup Médio do Cardápio"
        :value="markupMedio !== null ? markupMedio.toFixed(1) + '%' : ''"
        :accent="markupMedio !== null && markupMedio >= markupMinimo ? 'green' : 'rose'"
      />
      <KpiCard
        label="Margem Média"
        :value="margemMedia !== null ? margemMedia.toFixed(1) + '%' : ''"
        accent="blue"
      />
      <KpiCard
        label="Pratos Abaixo do Mínimo"
        :value="pratosAbaixo"
        :accent="pratosAbaixo > 0 ? 'rose' : 'green'"
      />
      <KpiCard
        label="Pratos Analisados"
        :value="pratosComCusto.length + '/' + pratos.length"
        accent="violet"
      />
    </section>

    <div class="charts-col">
      <ChartCard v-if="pratosComCusto.length > 0" title="Markup por Prato">
        <MarkupChart :pratos="pratosComCusto" :markup-minimo="markupMinimo" />
      </ChartCard>

      <ChartCard title="Pedidos por Status" :loading="store.loading">
        <StatusPedidosChart v-if="store.data?.pedidos" :resumo="store.data.pedidos" />
        <div v-else class="empty-state">Sem dados disponíveis.</div>
      </ChartCard>

      <ChartCard title="Produtos Mais Pedidos" :loading="store.loading">
        <ProdutosChart v-if="store.data?.produtosMaisVendidos?.length" :produtos="store.data.produtosMaisVendidos" />
        <div v-else class="empty-state">Sem dados disponíveis.</div>
      </ChartCard>
    </div>
  </div>
</template>

<style scoped>
.page { display: flex; flex-direction: column; gap: 24px; }
.page-title { font-size: 20px; font-weight: 700; color: #0f172a; }
.section-title { font-size: 14px; font-weight: 600; color: #374151; letter-spacing: 0.02em; }
.kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.charts-col { display: flex; flex-direction: column; gap: 16px; }
.empty-state { font-size: 13px; color: #94a3b8; text-align: center; padding: 32px 0; }
@media (max-width: 900px) { .kpi-row { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .kpi-row { grid-template-columns: 1fr; } }
</style>
