<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  loading?: boolean
  accent?: 'blue' | 'green' | 'amber' | 'rose' | 'violet'
}>()
</script>

<template>
  <div class="kpi-card" :class="accent ?? 'blue'">
    <p class="kpi-label">{{ label }}</p>
    <div v-if="loading" class="kpi-skeleton" />
    <p v-else class="kpi-value">{{ value }}</p>
  </div>
</template>

<style scoped>
.kpi-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px 24px;
  border: 1px solid #e8eaf0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  overflow: hidden;
}

.kpi-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
}
.kpi-card.blue::before   { background: #3b82f6; }
.kpi-card.green::before  { background: #22c55e; }
.kpi-card.amber::before  { background: #f59e0b; }
.kpi-card.rose::before   { background: #f43f5e; }
.kpi-card.violet::before { background: #8b5cf6; }

.kpi-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #8b92a5;
}

.kpi-value {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  line-height: 1.1;
  margin-top: 4px;
  min-height: 34px;
}

.kpi-skeleton {
  height: 34px;
  width: 60%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 6px;
  margin-top: 4px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
