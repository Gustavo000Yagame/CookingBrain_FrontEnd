<script setup lang="ts">
import { ref, watch } from 'vue'
import { pedidosService } from '@/services/pedidos.service'

const props = defineProps<{ modelValue?: string; pedidoId?: number }>()

const emit = defineEmits(['update:modelValue','saved','error'])

const options = [
  'Pendente',
  'Em Preparo',
  'Saiu para Entrega',
  'Entregue',
  'Cancelado',
]

const local = ref(props.modelValue ?? '')
const saving = ref(false)

watch(() => props.modelValue, v => { local.value = v ?? '' })

const onChange = async (e: Event) => {
  const v = (e.target as HTMLSelectElement).value
  emit('update:modelValue', v)

  if (props.pedidoId == null) return

  try {
    saving.value = true
    // map readable label to backend status format (upper snake)
    const map: Record<string,string> = {
      'Pendente': 'PENDENTE',
      'Em Preparo': 'EM_PREPARO',
      'Saiu para Entrega': 'EM_TRANSITO',
      'Entregue': 'ENTREGUE',
      'Cancelado': 'CANCELADO',
    }
    const backendStatus = map[v] ?? v.toUpperCase()
    // call service to alter status; pass minimal payload so it doesn't break
    await pedidosService.alterarStatus(props.pedidoId, backendStatus)
    emit('saved', backendStatus)
  } catch (err: any) {
    emit('error', err?.message ?? String(err))
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="flex items-center gap-2">
    <select
      :value="local"
      @change="onChange"
      class="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
    >
      <option v-for="o in options" :key="o" :value="o">{{ o }}</option>
    </select>
    <span v-if="saving" class="text-xs text-gray-500">Salvando...</span>
  </div>
</template>
