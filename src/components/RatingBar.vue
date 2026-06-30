<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ score: number; label?: string }>()

const pct = computed(() => Math.max(0, Math.min(100, (props.score / 5) * 100)))
</script>

<template>
  <div class="space-y-1">
    <div class="flex justify-between text-sm text-gray-600">
      <div>{{ props.label }}</div>
      <div class="font-semibold">{{ props.score.toFixed(1) }}/5</div>
    </div>
    <div class="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
      <div class="h-full bg-yellow-400 rounded-full transition-all" :style="{ width: pct + '%' }"></div>
    </div>
  </div>
</template>
