<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { avaliacoesService, type AvaliacaoResponse, type AvaliacaoRequest } from '@/services/avaliacoes.service'
import { pratosService, type PratoResponse } from '@/services/produtos.service'

const avaliacoes = ref<AvaliacaoResponse[]>([])
const pratos = ref<PratoResponse[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const saving = ref(false)
const deletingId = ref<number | null>(null)

const form = ref<AvaliacaoRequest>({ nota: 5, comentario: '', idPrato: 0 })
const showForm = ref(false)
const formError = ref<string | null>(null)

const mediaNotas = computed(() => {
  if (!avaliacoes.value.length) return null
  const soma = avaliacoes.value.reduce((acc, a) => acc + (a.nota ?? 0), 0)
  return (soma / avaliacoes.value.length).toFixed(1)
})

const notaColor = (nota: number) => {
  if (nota >= 4) return '#22c55e'
  if (nota >= 3) return '#f59e0b'
  return '#f43f5e'
}

const starsFilled = (nota: number, pos: number) => pos <= nota

async function carregar() {
  try {
    const [av, pr] = await Promise.all([
      avaliacoesService.listar(),
      pratosService.listar(),
    ])
    avaliacoes.value = av
    pratos.value = pr
    if (pr.length > 0 && form.value.idPrato === 0) {
      form.value.idPrato = pr[0].idPrato
    }
  } catch (e: any) {
    error.value = e?.message ?? 'Erro ao carregar avaliações.'
  } finally {
    loading.value = false
  }
}

async function salvar() {
  formError.value = null
  if (!form.value.idPrato) { formError.value = 'Selecione um prato.'; return }
  if (form.value.nota < 1 || form.value.nota > 5) { formError.value = 'Nota deve ser entre 1 e 5.'; return }
  saving.value = true
  try {
    const nova = await avaliacoesService.criar({
      nota: form.value.nota,
      comentario: form.value.comentario || undefined,
      idPrato: form.value.idPrato,
    })
    avaliacoes.value.unshift(nova)
    showForm.value = false
    form.value = { nota: 5, comentario: '', idPrato: pratos.value[0]?.idPrato ?? 0 }
  } catch (e: any) {
    formError.value = e?.message ?? 'Erro ao salvar avaliação.'
  } finally {
    saving.value = false
  }
}

async function deletar(id: number) {
  deletingId.value = id
  try {
    await avaliacoesService.deletar(id)
    avaliacoes.value = avaliacoes.value.filter(a => a.idAvaliacao !== id)
  } catch (e: any) {
    error.value = e?.message ?? 'Erro ao excluir avaliação.'
  } finally {
    deletingId.value = null
  }
}

onMounted(carregar)
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">Avaliações</h1>
      <button class="btn-primary" @click="showForm = !showForm">
        {{ showForm ? 'Cancelar' : 'Nova avaliação' }}
      </button>
    </div>

    <div v-if="showForm" class="form-card">
      <h2 class="form-title">Nova Avaliação</h2>

      <div class="field">
        <label class="field-label">Prato</label>
        <select v-model="form.idPrato" class="field-select">
          <option v-for="p in pratos" :key="p.idPrato" :value="p.idPrato">{{ p.nome }}</option>
        </select>
      </div>

      <div class="field">
        <label class="field-label">Nota</label>
        <div class="stars-input">
          <button
            v-for="n in 5" :key="n"
            type="button"
            class="star-btn"
            :class="{ filled: n <= form.nota }"
            @click="form.nota = n"
          >
            ★
          </button>
          <span class="nota-label">{{ form.nota }}/5</span>
        </div>
      </div>

      <div class="field">
        <label class="field-label">Comentário <span class="optional">(opcional, máx. 100 caracteres)</span></label>
        <textarea
          v-model="form.comentario"
          class="field-textarea"
          rows="3"
          maxlength="100"
          placeholder="Escreva um comentário..."
        />
      </div>

      <div v-if="formError" class="form-error">{{ formError }}</div>

      <button class="btn-primary" :disabled="saving" @click="salvar">
        {{ saving ? 'Salvando...' : 'Salvar avaliação' }}
      </button>
    </div>

    <div v-if="!loading && avaliacoes.length > 0" class="summary-card">
      <div class="summary-nota">{{ mediaNotas }}</div>
      <div class="summary-stars">
        <span v-for="n in 5" :key="n" class="summary-star" :class="{ filled: n <= Math.round(Number(mediaNotas)) }">★</span>
      </div>
      <div class="summary-label">Média de {{ avaliacoes.length }} avaliação{{ avaliacoes.length !== 1 ? 'ões' : '' }}</div>
    </div>

    <div v-if="loading" class="loading-rows">
      <div v-for="i in 4" :key="i" class="skeleton-row" />
    </div>

    <div v-else-if="error" class="error-box">{{ error }}</div>

    <div v-else-if="avaliacoes.length === 0" class="empty">
      Nenhuma avaliação cadastrada.
    </div>

    <div v-else class="cards-grid">
      <div v-for="a in avaliacoes" :key="a.idAvaliacao" class="av-card">
        <div class="av-header">
          <div class="av-prato">{{ a.prato?.nome ?? 'Prato removido' }}</div>
          <div class="av-nota" :style="{ color: notaColor(a.nota) }">
            <span v-for="n in 5" :key="n" class="av-star" :class="{ filled: starsFilled(a.nota, n) }">★</span>
            <span class="av-nota-num">{{ a.nota }}/5</span>
          </div>
        </div>
        <p v-if="a.comentario" class="av-comentario">{{ a.comentario }}</p>
        <div class="av-footer">
          <button
            class="btn-delete"
            :disabled="deletingId === a.idAvaliacao"
            @click="deletar(a.idAvaliacao)"
          >
            {{ deletingId === a.idAvaliacao ? 'Excluindo...' : 'Excluir' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { display: flex; flex-direction: column; gap: 20px; }
.page-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
.page-title { font-size: 20px; font-weight: 700; color: #0f172a; }

.btn-primary { background: #2563eb; color: #fff; border: none; border-radius: 8px; padding: 9px 18px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
.btn-primary:hover:not(:disabled) { background: #1d4ed8; }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

.form-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; display: flex; flex-direction: column; gap: 16px; }
.form-title { font-size: 15px; font-weight: 700; color: #0f172a; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field-label { font-size: 12px; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.04em; }
.optional { font-weight: 400; text-transform: none; color: #9ca3af; }
.field-select, .field-textarea { border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 12px; font-size: 13px; color: #374151; outline: none; transition: border-color 0.15s; background: #fff; }
.field-select:focus, .field-textarea:focus { border-color: #3b82f6; }
.field-textarea { resize: vertical; font-family: inherit; }
.stars-input { display: flex; align-items: center; gap: 4px; }
.star-btn { background: none; border: none; font-size: 28px; cursor: pointer; color: #d1d5db; transition: color 0.1s; padding: 0; }
.star-btn.filled { color: #f59e0b; }
.nota-label { margin-left: 8px; font-size: 13px; color: #6b7280; font-weight: 600; }
.form-error { background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; border-radius: 8px; padding: 10px 14px; font-size: 13px; }

.summary-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px 24px; display: flex; align-items: center; gap: 16px; }
.summary-nota { font-size: 40px; font-weight: 800; color: #0f172a; line-height: 1; }
.summary-stars { display: flex; gap: 2px; }
.summary-star { font-size: 20px; color: #d1d5db; }
.summary-star.filled { color: #f59e0b; }
.summary-label { font-size: 12px; color: #6b7280; }

.cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.av-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; display: flex; flex-direction: column; gap: 10px; }
.av-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.av-prato { font-size: 14px; font-weight: 700; color: #111827; }
.av-nota { display: flex; align-items: center; gap: 4px; }
.av-star { font-size: 14px; color: #d1d5db; }
.av-star.filled { color: #f59e0b; }
.av-nota-num { font-size: 12px; font-weight: 600; color: #6b7280; margin-left: 4px; }
.av-comentario { font-size: 13px; color: #4b5563; line-height: 1.6; margin: 0; }
.av-footer { display: flex; justify-content: flex-end; }
.btn-delete { background: none; border: 1px solid #fecaca; color: #dc2626; border-radius: 6px; padding: 5px 12px; font-size: 11px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
.btn-delete:hover:not(:disabled) { background: #fef2f2; }
.btn-delete:disabled { opacity: 0.6; cursor: not-allowed; }

.loading-rows { display: flex; flex-direction: column; gap: 8px; }
.skeleton-row { height: 100px; border-radius: 12px; background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
.error-box { background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; border-radius: 8px; padding: 14px 16px; font-size: 13px; }
.empty { text-align: center; padding: 48px; color: #94a3b8; font-size: 13px; }
</style>
