<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { pratosService, type PratoResponse } from '@/services/produtos.service'

const produtos = ref<PratoResponse[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)

const form = ref<Partial<PratoResponse>>({ nome: '', descricao: '', preco: 0, idRestaurante: 0 })
const editingId = ref<number | null>(null)

const load = async () => {
  loading.value = true
  try {
    produtos.value = await pratosService.listar()
  } catch (e: any) {
    error.value = e?.message ?? 'Erro ao carregar produtos'
  } finally { loading.value = false }
}

const startEdit = (p: PratoResponse) => {
  editingId.value = p.idPrato
  form.value = { ...p }
}

const resetForm = () => {
  editingId.value = null
  form.value = { nome: '', descricao: '', preco: 0, idRestaurante: 0 }
}

const salvar = async () => {
  try {
    loading.value = true
    if (editingId.value) {
      await pratosService.atualizar(editingId.value, form.value as any)
      success.value = 'Produto atualizado'
    } else {
      await pratosService.salvar(form.value as any)
      success.value = 'Produto criado'
    }
    await load()
    resetForm()
  } catch (e: any) {
    error.value = e?.message ?? 'Erro ao salvar produto'
  } finally { loading.value = false }
}

const deletar = async (id: number) => {
  if (!confirm('Deletar produto?')) return
  try { await pratosService.deletar(id); await load(); success.value = 'Produto removido' } catch (e: any) { error.value = e?.message ?? 'Erro ao deletar' }
}

onMounted(load)
</script>

<template>
  <div class="space-y-4">
    <div v-if="success" class="text-green-600">{{ success }}</div>
    <div v-if="error" class="text-red-600">{{ error }}</div>

    <div class="bg-white p-4 rounded-lg shadow-sm">
      <h3 class="font-semibold mb-2">Novo produto</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input v-model="form.nome" placeholder="Nome" class="p-2 border rounded" />
        <input v-model.number="form.preco" placeholder="Preço" type="number" class="p-2 border rounded" />
        <input v-model.number="form.idRestaurante" placeholder="Restaurante ID" type="number" class="p-2 border rounded" />
      </div>
      <textarea v-model="form.descricao" placeholder="Descrição" class="mt-2 p-2 border rounded w-full" />
      <div class="mt-2 flex gap-2">
        <button @click.prevent="salvar" class="px-3 py-2 bg-blue-600 text-white rounded">{{ editingId ? 'Salvar' : 'Criar' }}</button>
        <button @click.prevent="resetForm" class="px-3 py-2 border rounded">Cancelar</button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <article v-for="p in produtos" :key="p.idPrato" class="p-3 bg-white rounded shadow-sm flex justify-between items-start">
        <div>
          <h4 class="font-semibold">{{ p.nome }}</h4>
          <div class="text-sm text-gray-500">R$ {{ p.preco?.toFixed(2) }}</div>
        </div>
        <div class="flex gap-2">
          <button @click="startEdit(p)" class="text-blue-600">Editar</button>
          <button @click="deletar(p.idPrato)" class="text-red-600">Deletar</button>
        </div>
      </article>
    </div>
  </div>
</template>
