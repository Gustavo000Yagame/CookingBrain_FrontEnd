<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js'
import type { PratoResponse } from '@/services/produtos.service'
import { useMarkup } from '@/composables/useMarkup'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const props = defineProps<{
  pratos: PratoResponse[]
  markupMinimo: number
}>()

const { getCusto, calcMarkup } = useMarkup()

const chartData = computed(() => {
  const sorted = [...props.pratos]
    .map(p => ({ nome: p.nome, markup: calcMarkup(p.preco, getCusto(p.idPrato)) ?? 0 }))
    .sort((a, b) => b.markup - a.markup)

  return {
    labels: sorted.map(p => p.nome.length > 16 ? p.nome.slice(0, 14) + '…' : p.nome),
    datasets: [
      {
        label: 'Markup (%)',
        data: sorted.map(p => parseFloat(p.markup.toFixed(1))),
        backgroundColor: sorted.map(p =>
          p.markup >= props.markupMinimo ? '#22c55e' : '#f43f5e'
        ),
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  }
})

const options = computed<ChartOptions<'bar'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => {
          const y = ctx.parsed?.y ?? 0
          return ` Markup: ${y.toFixed(1)}%`
        },
        afterLabel: (ctx) => {
          const y = ctx.parsed?.y ?? 0
          return y >= props.markupMinimo
            ? ' Saudável'
            : ` Abaixo do mínimo (${props.markupMinimo}%)`
        },
      },
    },
  },
  scales: {
    x: { grid: { display: false }, ticks: { font: { size: 11 } } },
    y: {
      grid: { color: '#f3f4f6' },
      ticks: {
        font: { size: 11 },
        callback: (v) => v + '%',
      },
    },
  },
}))
</script>

<template>
  <div class="chart-wrap">
    <div class="legend-row">
      <span class="legend-dot" style="background:#22c55e" />
      <span class="legend-label">Acima do mínimo ({{ markupMinimo }}%)</span>
      <span class="legend-dot" style="background:#f43f5e; margin-left:12px" />
      <span class="legend-label">Abaixo do mínimo</span>
    </div>
    <div :style="{ height: Math.max(200, pratos.length * 40) + 'px', position: 'relative' }">
      <Bar :data="chartData" :options="options" />
    </div>
  </div>
</template>

<style scoped>
.chart-wrap { display: flex; flex-direction: column; gap: 12px; }
.legend-row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.legend-label { font-size: 12px; color: #6b7280; }
</style>
