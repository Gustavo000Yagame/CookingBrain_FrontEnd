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
} from 'chart.js'
import type { ProdutoMaisVendido } from '@/interface/api'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const props = defineProps<{ produtos: ProdutoMaisVendido[] }>()

const chartData = computed(() => ({
  labels: props.produtos.map((p) =>
    p.nome.length > 18 ? p.nome.slice(0, 16) + '…' : p.nome
  ),
  datasets: [
    {
      label: 'Unidades vendidas',
      data: props.produtos.map((p) => p.quantidade),
      backgroundColor: [
        '#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b', '#f43f5e',
        '#06b6d4', '#a855f7', '#84cc16', '#fb923c', '#ec4899',
      ],
      borderRadius: 6,
      borderSkipped: false,
    },
  ],
}))

const options = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y' as const,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: any) => ` ${ctx.parsed.x} unidades`,
      },
    },
  },
  scales: {
    x: {
      grid: { color: '#f3f4f6' },
      ticks: { font: { size: 11 } },
    },
    y: {
      grid: { display: false },
      ticks: { font: { size: 11 } },
    },
  },
}
</script>

<template>
  <div :style="{ height: Math.max(180, props.produtos.length * 36) + 'px', position: 'relative' }">
    <Bar :data="chartData" :options="options" />
  </div>
</template>
