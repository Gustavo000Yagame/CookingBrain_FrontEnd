<script setup lang="ts">
defineProps<{
  title: string
  loading?: boolean
}>()
</script>

<template>
  <div class="chart-card">
    <h3 class="chart-title">{{ title }}</h3>
    <div v-if="loading" class="chart-skeleton" />
    <slot v-else />
  </div>
</template>

<style scoped>
.chart-card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e8eaf0;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chart-title {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #6b7280;
}

.chart-skeleton {
  height: 220px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 8px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
