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
      <KpiCard label="Faturamento Total" :value="store.data ? fmt(store.data.financeiro.faturamentoMensal) : '—'" accent="green" :loading="store.loading" />
      <KpiCard label="Ticket Médio" :value="store.data ? fmt(store.data.financeiro.ticketMedio) : '—'" accent="blue" :loading="store.loading" />
      <KpiCard label="Total de Pedidos" :value="store.data?.pedidos.total ?? '—'" accent="violet" :loading="store.loading" />
      <KpiCard label="Clientes" :value="store.data?.clientesAtendidos ?? '—'" accent="amber" :loading="store.loading" />
    </section>

    <h2 class="section-title">Análise de Markup</h2>

    <section class="kpi-row">
      <KpiCard
        label="Markup Médio do Cardápio"
        :value="markupMedio !== null ? markupMedio.toFixed(1) + '%' : '—'"
        :sub="markupMedio !== null
          ? (markupMedio >= markupMinimo ? 'Acima do mínimo de ' + markupMinimo + '%' : 'Abaixo do mínimo de ' + markupMinimo + '%')
          : 'Cadastre custos em Produtos'"
        :accent="markupMedio !== null && markupMedio >= markupMinimo ? 'green' : 'rose'"
      />
      <KpiCard
        label="Margem Média"
        :value="margemMedia !== null ? margemMedia.toFixed(1) + '%' : '—'"
        sub="Percentual do preço que é lucro"
        accent="blue"
      />
      <KpiCard
        label="Pratos Abaixo do Mínimo"
        :value="pratosAbaixo"
        :sub="pratosAbaixo > 0 ? 'Revisar preço ou custo' : 'Todos saudáveis'"
        :accent="pratosAbaixo > 0 ? 'rose' : 'green'"
      />
      <KpiCard
        label="Pratos Analisados"
        :value="pratosComCusto.length + '/' + pratos.length"
        sub="Com custo cadastrado"
        accent="violet"
      />
    </section>

    <div class="charts-col">
      <ChartCard title="Markup por Prato" v-if="pratosComCusto.length > 0">
        <MarkupChart :pratos="pratosComCusto" :markup-minimo="markupMinimo" />
      </ChartCard>
      <div v-else class="info-box">
        Cadastre o custo dos pratos na tela de Produtos para ver o gráfico de markup.
      </div>

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
        <p v-else class="empty-state">Disponível quando o backend expor datas nos pedidos.</p>
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
.info-box { background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; border-radius: 10px; padding: 16px 20px; font-size: 13px; }
@media (max-width: 900px) { .kpi-row { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .kpi-row { grid-template-columns: 1fr; } }
</style>
