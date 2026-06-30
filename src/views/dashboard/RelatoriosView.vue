<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { pratosService, type PratoResponse } from '@/services/produtos.service'
import { useMarkup } from '@/composables/useMarkup'
import ChartCard from '@/components/dashboard/ChartCard.vue'
import VendasChart from '@/components/dashboard/VendasChart.vue'
import ProdutosChart from '@/components/dashboard/ProdutosChart.vue'
import StatusPedidosChart from '@/components/dashboard/StatusPedidosChart.vue'
import MarkupChart from '@/components/dashboard/MarkupChart.vue'
import KpiCard from '@/components/dashboard/KpiCard.vue'
import RatingBar from '@/components/RatingBar.vue'

const store = useDashboardStore()
const pratos = ref<PratoResponse[]>([])

const { getCusto, calcMarkup, calcMargem, markupMinimo, markupMedioDoCardapio } = useMarkup()

const fmt = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

const avaliacoes = [
  { label: 'Atendimento', valor: 4.6 },
  { label: 'Tempo de Entrega', valor: 4.2 },
  { label: 'Qualidade', valor: 4.8 },
]

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
      <KpiCard label="Faturamento Total" :value="store.data ? fmt(store.data.financeiro.faturamentoMensal) : ''" accent="green" :loading="store.loading" />
      <KpiCard label="Ticket Médio" :value="store.data ? fmt(store.data.financeiro.ticketMedio) : ''" accent="blue" :loading="store.loading" />
      <KpiCard label="Total de Pedidos" :value="store.data?.pedidos.total ?? ''" accent="violet" :loading="store.loading" />
      <KpiCard label="Clientes" :value="store.data?.clientesAtendidos ?? ''" accent="amber" :loading="store.loading" />
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

    <section class="review-card">
      <div class="review-header">
        <h2 class="section-title">Avaliações</h2>
        <span class="review-summary">Média geral 4,5/5</span>
      </div>

      <div v-for="item in avaliacoes" :key="item.label" class="review-row">
        <div class="review-meta">
          <span>{{ item.label }}</span>
          <strong>{{ item.valor.toFixed(1) }}/5</strong>
        </div>
        <div class="review-bar">
          <div class="review-fill" :style="{ width: `${(item.valor / 5) * 100}%` }" />
        </div>
      </div>
    </section>

    <div class="charts-col">
      <ChartCard title="Markup por Prato" v-if="pratosComCusto.length > 0">
        <MarkupChart :pratos="pratosComCusto" :markup-minimo="markupMinimo" />
      </ChartCard>

      <ChartCard title="Pedidos por Status" :loading="store.loading">
        <StatusPedidosChart v-if="store.data?.pedidos" :resumo="store.data.pedidos" />
      </ChartCard>

      <ChartCard title="Produtos Mais Pedidos" :loading="store.loading">
        <ProdutosChart v-if="store.data?.produtosMaisVendidos?.length" :produtos="store.data.produtosMaisVendidos" />
      </ChartCard>

      <ChartCard title="Avaliações dos Pratos" :loading="store.loading">
        <div class="space-y-4">
          <div v-for="p in store.data?.produtosMaisVendidos ?? []" :key="p.produtoId">
            <RatingBar :label="p.nome ?? p.produtoId.toString()" :score="Math.min(5, 1 + ((p.quantidade ?? 0) / (store.data?.produtosMaisVendidos?.[0]?.quantidade ?? 1)) * 4)" />
          </div>
        </div>
      </ChartCard>

      <ChartCard title="Faturamento ao Longo do Tempo" :loading="store.loading">
        <VendasChart v-if="store.data?.vendasPorDia?.length" :vendas="store.data.vendasPorDia" />
      </ChartCard>
    </div>
  </div>
</template>

<style scoped>
.page { display: flex; flex-direction: column; gap: 24px; }
.page-title { font-size: 20px; font-weight: 700; color: #0f172a; }
.section-title { font-size: 14px; font-weight: 600; color: #374151; letter-spacing: 0.02em; }
.kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.review-card { background: #fff; border: 1px solid #e8eaf0; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.review-header { display: flex; justify-content: space-between; align-items: center; }
.review-summary { color: #64748b; font-size: 12px; }
.review-row { display: flex; flex-direction: column; gap: 6px; }
.review-meta { display: flex; justify-content: space-between; font-size: 13px; color: #334155; }
.review-bar { height: 8px; border-radius: 999px; background: #e2e8f0; overflow: hidden; }
.review-fill { height: 100%; border-radius: inherit; background: linear-gradient(90deg, #10b981, #3b82f6); }
.charts-col { display: flex; flex-direction: column; gap: 16px; }
@media (max-width: 900px) { .kpi-row { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .kpi-row { grid-template-columns: 1fr; } }
</style>
