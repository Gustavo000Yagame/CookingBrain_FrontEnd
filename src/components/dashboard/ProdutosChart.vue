<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
import type { ProdutoMaisVendido } from '@/types/api'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const props = defineProps<{ produtos: ProdutoMaisVendido[] }>()

const temDados = computed(() => props.produtos.length > 0)

const chartData = computed(() => ({
  labels: props.produtos.map(p =>
    p.nome.length > 18 ? p.nome.slice(0, 16) + '…' : p.nome
  ),
  datasets: [
    {
      label: 'Pedidos',
      data: props.produtos.map(p => p.quantidade),
      backgroundColor: [
        '#3b82f6','#8b5cf6','#22c55e','#f59e0b','#f43f5e',
        '#06b6d4','#a855f7','#84cc16','#fb923c','#ec4899',
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
        label: (ctx: any) => ` ${ctx.parsed.x} pedido${ctx.parsed.x !== 1 ? 's' : ''}`,
      },
    },
  },
  scales: {
    x: { grid: { color: '#f3f4f6' }, ticks: { font: { size: 11 }, precision: 0 } },
    y: { grid: { display: false }, ticks: { font: { size: 11 } } },
  },
}
</script>

<template>
  <div v-if="temDados" :style="{ height: Math.max(180, props.produtos.length * 40) + 'px', position: 'relative' }">
    <Bar :data="chartData" :options="options" />
  </div>
  <div v-else class="sem-dados">Nenhum produto com pedidos ainda.</div>
</template>

<style scoped>
.sem-dados { font-size: 13px; color: #94a3b8; text-align: center; padding: 40px 0; }
</style>
