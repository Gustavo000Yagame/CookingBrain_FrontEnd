<script setup lang="ts">
import { ref } from 'vue'
import { pedidosService } from '@/services/pedidos.service'
import { avaliacoesService } from '@/services/avaliacoes.service'

const pedidoForm = ref({ clienteId: 0, formaPag: 'PIX', pratos: [] as { idPrato: number }[] })
const pratoId = ref<number | null>(null)
const avaliacaoForm = ref({ idPedido: 0, categoria: 'Atendimento', valor: 5, comentario: '' })

const loading = ref(false)
const message = ref<string | null>(null)

const criarPedido = async () => {
  try {
    loading.value = true
    const pratosPayload = pratoId.value ? [{ idPrato: pratoId.value }] : pedidoForm.value.pratos
    await pedidosService.salvar({ status: 'PENDENTE', formaPag: pedidoForm.value.formaPag, clienteId: pedidoForm.value.clienteId, pratos: pratosPayload })
    message.value = 'Pedido criado'
  } catch (e: any) {
    message.value = e?.message ?? 'Erro'
  } finally { loading.value = false }
}

const enviarAvaliacao = async () => {
  try {
    loading.value = true
    await avaliacoesService.criar({ idPedido: avaliacaoForm.value.idPedido, categoria: avaliacaoForm.value.categoria, valor: avaliacaoForm.value.valor, comentario: avaliacaoForm.value.comentario })
    message.value = 'Avaliação enviada'
  } catch (e: any) {
    message.value = e?.message ?? 'Erro'
  } finally { loading.value = false }
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-4 space-y-6">
    <h1 class="text-lg font-bold">Atalho Secreto — Criar Pedido / Avaliar</h1>

    <section class="bg-white p-4 rounded shadow-sm">
      <h2 class="font-semibold mb-2">Criar Pedido Rápido</h2>
      <div class="grid grid-cols-1 gap-2">
        <input v-model.number="pedidoForm.clienteId" placeholder="Cliente ID" class="p-2 border rounded" />
        <input v-model="pedidoForm.formaPag" placeholder="Forma Pagamento" class="p-2 border rounded" />
        <input v-model.number="pratoId" placeholder="ID Prato (ex: 1)" class="p-2 border rounded" />
        <div class="flex gap-2 mt-2">
          <button @click.prevent="criarPedido" class="px-3 py-2 bg-blue-600 text-white rounded">Criar Pedido</button>
        </div>
      </div>
    </section>

    <section class="bg-white p-4 rounded shadow-sm">
      <h2 class="font-semibold mb-2">Enviar Avaliação Rápida</h2>
      <div class="grid grid-cols-1 gap-2">
        <input v-model.number="avaliacaoForm.idPedido" placeholder="Pedido ID" class="p-2 border rounded" />
        <select v-model="avaliacaoForm.categoria" class="p-2 border rounded">
          <option>Atendimento</option>
          <option>Tempo de Entrega</option>
          <option>Qualidade</option>
        </select>
        <input v-model.number="avaliacaoForm.valor" type="number" min="1" max="5" step="0.5" class="p-2 border rounded" />
        <textarea v-model="avaliacaoForm.comentario" rows="3" class="p-2 border rounded" />
        <div class="flex gap-2 mt-2">
          <button @click.prevent="enviarAvaliacao" class="px-3 py-2 bg-green-600 text-white rounded">Enviar Avaliação</button>
        </div>
      </div>
    </section>

    <div v-if="message" class="text-sm text-gray-700">{{ message }}</div>
  </div>
</template>
