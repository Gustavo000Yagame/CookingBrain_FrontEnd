<script setup lang="ts">
defineProps<{
  message: string
}>()
const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <div class="error-banner">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
    <span>{{ message }}</span>
    <button class="retry-btn" @click="emit('retry')">Tentar novamente</button>
  </div>
</template>

<style scoped>
.error-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 13px;
}
.error-banner span { flex: 1; }
.retry-btn {
  background: none;
  border: 1px solid #b91c1c;
  color: #b91c1c;
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;
}
.retry-btn:hover { background: #fee2e2; }
</style>
