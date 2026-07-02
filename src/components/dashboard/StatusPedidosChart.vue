<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import type { ResumoPedidos } from '@/types/api'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps<{ resumo: ResumoPedidos }>()

const temDados = computed(() => props.resumo.total > 0)

const chartData = computed(() => ({
  labels: ['Pendentes', 'Em Preparo', 'Prontos', 'Entregues', 'Cancelados'],
  datasets: [
    {
      data: [
        props.resumo.pendentes,
        props.resumo.emPreparo,
        props.resumo.prontos,
        props.resumo.entregues,
        props.resumo.cancelados,
      ],
      backgroundColor: ['#f59e0b', '#3b82f6', '#22c55e', '#6b7280', '#f43f5e'],
      borderWidth: 0,
      hoverOffset: 6,
    },
  ],
}))

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: { font: { size: 12 }, padding: 16, usePointStyle: true, pointStyleWidth: 8 },
    },
    tooltip: {
      callbacks: {
        label: (ctx: any) => ` ${ctx.label}: ${ctx.parsed} pedidos`,
      },
    },
  },
}
</script>

<template>
  <div v-if="temDados" style="height: 240px; position: relative">
    <Doughnut :data="chartData" :options="options" />
  </div>
  <div v-else class="sem-dados">Nenhum pedido registrado ainda.</div>
</template>

<style scoped>
.sem-dados { font-size: 13px; color: #94a3b8; text-align: center; padding: 40px 0; }
</style>
