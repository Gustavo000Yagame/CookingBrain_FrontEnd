<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { avaliacoesService, type AvaliacaoRequest } from '@/services/avaliacoes.service'
import { pedidosService, type PedidoResponse } from '@/services/pedidos.service'

interface AvaliacaoForm {
  idPedido: number
  categoria: string
  valor: number
  comentario: string
}

const pedidos = ref<PedidoResponse[]>([])
const avaliacoes = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)

const form = ref<AvaliacaoForm>({
  idPedido: 0,
  categoria: 'Atendimento',
  valor: 5,
  comentario: '',
})

const categorias = ['Atendimento', 'Tempo de Entrega', 'Qualidade', 'Limpeza', 'Preço']

const enviarAvaliacao = async () => {
  if (!form.value.idPedido) {
    error.value = 'Selecione um pedido'
    return
  }

  try {
    loading.value = true
    error.value = null
    success.value = null

    const payload: AvaliacaoRequest = {
      idPedido: form.value.idPedido,
      categoria: form.value.categoria,
      valor: form.value.valor,
      comentario: form.value.comentario || undefined,
    }

    await avaliacoesService.criar(payload)

    success.value = 'Avaliação enviada com sucesso!'
    form.value = {
      idPedido: 0,
      categoria: 'Atendimento',
      valor: 5,
      comentario: '',
    }

    await carregarAvaliacoes()

    setTimeout(() => {
      success.value = null
    }, 3000)
  } catch (e: any) {
    error.value = e?.message ?? 'Erro ao enviar avaliação'
  } finally {
    loading.value = false
  }
}

const carregarAvaliacoes = async () => {
  try {
    avaliacoes.value = await avaliacoesService.listar()
  } catch {
    avaliacoes.value = []
  }
}

const deletarAvaliacao = async (id: number) => {
  try {
    await avaliacoesService.deletar(id)
    await carregarAvaliacoes()
  } catch (e: any) {
    error.value = e?.message ?? 'Erro ao deletar avaliação'
  }
}

onMounted(async () => {
  try {
    loading.value = true
    const [pedidosData, avaliacoesData] = await Promise.all([
      pedidosService.listar(),
      carregarAvaliacoes(),
    ])
    pedidos.value = pedidosData
  } catch (e: any) {
    error.value = e?.message ?? 'Erro ao carregar dados'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="page">
    <h1 class="page-title">Avaliações</h1>

    <div v-if="success" class="alert success">✓ {{ success }}</div>
    <div v-if="error" class="alert error">✗ {{ error }}</div>

    <div class="form-container">
      <h2 class="form-title">Nova Avaliação</h2>

      <section class="form-section">
        <label class="form-label">Pedido</label>
        <select v-model.number="form.idPedido" class="form-input">
          <option :value="0">Selecione um pedido...</option>
          <option v-for="p in pedidos" :key="p.idPedido" :value="p.idPedido">
            #{{ p.idPedido }} - {{ p.nome }}
          </option>
        </select>
      </section>

      <section class="form-section">
        <label class="form-label">Categoria</label>
        <select v-model="form.categoria" class="form-input">
          <option v-for="cat in categorias" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </section>

      <section class="form-section">
        <label class="form-label">Nota (1-5)</label>
        <div class="rating-input">
          <input
            v-model.number="form.valor"
            type="range"
            min="1"
            max="5"
            step="0.5"
            class="range-slider"
          />
          <div class="rating-display">{{ form.valor.toFixed(1) }}/5</div>
        </div>
        <div class="star-preview">
          <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= form.valor }">
            ★
          </span>
        </div>
      </section>

      <section class="form-section">
        <label class="form-label">Comentário (Opcional)</label>
        <textarea
          v-model="form.comentario"
          class="form-textarea"
          placeholder="Deixe seu comentário..."
          rows="4"
        />
      </section>

      <button :disabled="loading" class="btn-submit" @click="enviarAvaliacao">
        {{ loading ? 'Enviando...' : 'Enviar Avaliação' }}
      </button>
    </div>

    <div class="avaliacoes-container">
      <h2 class="section-title">Avaliações Recentes</h2>

      <div v-if="avaliacoes.length === 0" class="muted">Nenhuma avaliação registrada</div>

      <div v-else class="avaliacoes-grid">
        <div v-for="av in avaliacoes" :key="av.idAvaliacao" class="avaliacao-card">
          <div class="card-header">
            <div>
              <p class="categoria">{{ av.categoria }}</p>
              <div class="stars">
                <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= av.valor }">
                  ★
                </span>
              </div>
            </div>
            <button class="btn-delete" @click="deletarAvaliacao(av.idAvaliacao)">✕</button>
          </div>

          <div v-if="av.comentario" class="comentario">{{ av.comentario }}</div>

          <div class="metadata">
            <span>Pedido #{{ av.idPedido }}</span>
            <span v-if="av.dataCriacao" class="data">
              {{ new Date(av.dataCriacao).toLocaleDateString('pt-BR') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { display: flex; flex-direction: column; gap: 24px; max-width: 1000px; }
.page-title { font-size: 20px; font-weight: 700; color: #0f172a; }
.alert { padding: 12px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; }
.alert.success { background: #dcfce7; color: #166534; border: 1px solid #86efac; }
.alert.error { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

.form-container { background: #fff; border: 1px solid #e8eaf0; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; gap: 16px; }
.form-title { margin: 0; font-size: 15px; font-weight: 600; color: #0f172a; }
.form-section { display: flex; flex-direction: column; gap: 8px; }
.form-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; }
.form-input, .form-textarea { padding: 10px; border: 1px solid #dbe3ee; border-radius: 6px; font-size: 13px; color: #334155; font-family: inherit; }
.form-input:focus, .form-textarea:focus { outline: none; border-color: #60a5fa; box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1); }

.rating-input { display: flex; align-items: center; gap: 12px; }
.range-slider { flex: 1; }
.rating-display { min-width: 50px; text-align: center; font-size: 14px; font-weight: 700; color: #2563eb; }

.star-preview { display: flex; gap: 4px; }
.star { font-size: 16px; color: #dbe3ee; transition: color 0.2s; cursor: default; }
.star.filled { color: #fbbf24; }

.btn-submit { padding: 12px; border: none; background: #2563eb; color: #fff; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
.btn-submit:hover:not(:disabled) { background: #1d4ed8; }
.btn-submit:disabled { opacity: 0.7; cursor: wait; }

.avaliacoes-container { display: flex; flex-direction: column; gap: 16px; }
.section-title { margin: 0; font-size: 15px; font-weight: 600; color: #0f172a; }
.muted { color: #94a3b8; font-size: 13px; }

.avaliacoes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; }
.avaliacao-card { background: #fff; border: 1px solid #e8eaf0; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; gap: 8px; }
.card-header { display: flex; justify-content: space-between; align-items: flex-start; }
.categoria { margin: 0; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; }
.stars { display: flex; gap: 2px; }
.star { font-size: 14px; color: #dbe3ee; }
.star.filled { color: #fbbf24; }
.btn-delete { border: none; background: none; color: #94a3b8; cursor: pointer; padding: 0; font-size: 16px; transition: color 0.2s; }
.btn-delete:hover { color: #f43f5e; }
.comentario { font-size: 13px; color: #334155; line-height: 1.4; }
.metadata { display: flex; justify-content: space-between; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 8px; }
</style>
