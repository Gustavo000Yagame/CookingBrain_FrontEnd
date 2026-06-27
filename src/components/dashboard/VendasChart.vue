<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import type { VendaDiaria } from '@/types/api'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const props = defineProps<{ vendas: VendaDiaria[] }>()

const fmt = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

const chartData = computed(() => ({
  labels: props.vendas.map((v) => {
    const d = new Date(v.data)
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  }),
  datasets: [
    {
      label: 'Faturamento',
      data: props.vendas.map((v) => v.faturamento),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59,130,246,0.08)',
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 6,
      yAxisID: 'y',
    },
    {
      label: 'Pedidos',
      data: props.vendas.map((v) => v.quantidadePedidos),
      borderColor: '#22c55e',
      backgroundColor: 'transparent',
      fill: false,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 6,
      borderDash: [4, 4],
      yAxisID: 'y1',
    },
  ],
}))

const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index' as const, intersect: false },
  plugins: {
    legend: {
      position: 'top' as const,
      labels: { font: { size: 12 }, usePointStyle: true, pointStyleWidth: 8 },
    },
    tooltip: {
      callbacks: {
        label: (ctx: any) =>
          ctx.datasetIndex === 0
            ? ` Faturamento: ${fmt(ctx.parsed.y)}`
            : ` Pedidos: ${ctx.parsed.y}`,
      },
    },
  },
  scales: {
    y: {
      type: 'linear' as const,
      position: 'left' as const,
      grid: { color: '#f3f4f6' },
      ticks: {
        callback: (v: any) => fmt(v),
        font: { size: 11 },
      },
    },
    y1: {
      type: 'linear' as const,
      position: 'right' as const,
      grid: { drawOnChartArea: false },
      ticks: { font: { size: 11 } },
    },
    x: {
      grid: { display: false },
      ticks: { font: { size: 11 } },
    },
  },
}
</script>

<template>
  <div style="height: 260px; position: relative">
    <Line :data="chartData" :options="options" />
  </div>
</template>
