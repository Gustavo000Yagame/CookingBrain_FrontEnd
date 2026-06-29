<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { pedidosService } from '@/services/pedidos.service'
import { clientesService, type ClienteResponse } from '@/services/clientes.service'
import { pratosService, type PratoResponse } from '@/services/produtos.service'

const loading = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)

const clientesLista = ref<ClienteResponse[]>([])
const pratos = ref<PratoResponse[]>([])

const form = ref({
  clienteId: 0,
  formasPagamento: 'DINHEIRO',
  itensSelecionados: [] as number[],
})

const itemsSelecionados = computed(() =>
  form.value.itensSelecionados
    .map(id => pratos.value.find(p => p.idPrato === id))
    .filter((p): p is PratoResponse => !!p)
)

const totalPedido = computed(() =>
  itemsSelecionados.value.reduce((sum, p) => sum + (p.preco ?? 0), 0)
)

const adicionarItem = (idPrato: number) => {
  if (!form.value.itensSelecionados.includes(idPrato)) {
    form.value.itensSelecionados.push(idPrato)
  }
}

const removerItem = (idPrato: number) => {
  form.value.itensSelecionados = form.value.itensSelecionados.filter(id => id !== idPrato)
}

const enviarPedido = async () => {
  if (!form.value.clienteId) {
    error.value = 'Selecione um cliente'
    return
  }

  if (form.value.itensSelecionados.length === 0) {
    error.value = 'Adicione pelo menos um item'
    return
  }

  try {
    loading.value = true
    error.value = null
    success.value = null

    await pedidosService.salvar({
      status: 'PENDENTE',
      formaPag: form.value.formasPagamento,
      clienteId: form.value.clienteId,
      pratos: form.value.itensSelecionados.map(id => ({ idPrato: id })),
    })

    success.value = 'Pedido criado com sucesso!'
    form.value = {
      clienteId: 0,
      formasPagamento: 'DINHEIRO',
      itensSelecionados: [],
    }

    setTimeout(() => {
      success.value = null
    }, 3000)
  } catch (e: any) {
    error.value = e?.message ?? 'Erro ao criar pedido'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  try {
    const [clientesData, pratosData] = await Promise.all([
      clientesService.listar(),
      pratosService.listar(),
    ])
    clientesLista.value = clientesData
    pratos.value = pratosData
  } catch {
    error.value = 'Erro ao carregar dados'
  }
})
</script>

<template>
  <div class="page">
    <h1 class="page-title">Criar Pedido</h1>

    <div v-if="success" class="alert success">✓ {{ success }}</div>
    <div v-if="error" class="alert error">✗ {{ error }}</div>

    <div class="form-container">
      <section class="form-section">
        <label class="form-label">Cliente</label>
        <select v-model.number="form.clienteId" class="form-input">
          <option :value="0">Selecione um cliente...</option>
          <option v-for="c in clientesLista" :key="c.idCliente" :value="c.idCliente">
            {{ c.nome }}
          </option>
        </select>
      </section>

      <section class="form-section">
        <label class="form-label">Forma de Pagamento</label>
        <select v-model="form.formasPagamento" class="form-input">
          <option value="DINHEIRO">Dinheiro</option>
          <option value="CARTAO_CREDITO">Cartão Crédito</option>
          <option value="CARTAO_DEBITO">Cartão Débito</option>
          <option value="PIX">PIX</option>
        </select>
      </section>

      <section class="form-section">
        <label class="form-label">Produtos</label>
        <div class="pratos-grid">
          <div v-for="prato in pratos" :key="prato.idPrato" class="prato-card">
            <div class="prato-info">
              <h3>{{ prato.nome }}</h3>
              <p class="prato-preco">R$ {{ prato.preco.toFixed(2) }}</p>
            </div>
            <button
              v-if="!form.itensSelecionados.includes(prato.idPrato)"
              class="btn-add"
              @click="adicionarItem(prato.idPrato)"
            >
              +
            </button>
            <button v-else class="btn-remove" @click="removerItem(prato.idPrato)">
              ✓
            </button>
          </div>
        </div>
      </section>

      <section class="selecionados">
        <h2>Itens Selecionados</h2>
        <div v-if="itemsSelecionados.length" class="itens-lista">
          <div v-for="item in itemsSelecionados" :key="item.idPrato" class="item-selecionado">
            <span>{{ item.nome }}</span>
            <strong>R$ {{ item.preco.toFixed(2) }}</strong>
          </div>
        </div>
        <div v-else class="muted">Nenhum item selecionado</div>
      </section>

      <div class="resumo">
        <div class="resumo-item">
          <span>Subtotal</span>
          <strong>R$ {{ totalPedido.toFixed(2) }}</strong>
        </div>
        <div class="resumo-item total">
          <span>Total</span>
          <strong>R$ {{ totalPedido.toFixed(2) }}</strong>
        </div>
      </div>

      <button :disabled="loading" class="btn-submit" @click="enviarPedido">
        {{ loading ? 'Criando...' : 'Criar Pedido' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.page { display: flex; flex-direction: column; gap: 20px; max-width: 800px; }
.page-title { font-size: 20px; font-weight: 700; color: #0f172a; }
.alert { padding: 12px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; }
.alert.success { background: #dcfce7; color: #166534; border: 1px solid #86efac; }
.alert.error { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

.form-container { background: #fff; border: 1px solid #e8eaf0; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; gap: 20px; }
.form-section { display: flex; flex-direction: column; gap: 8px; }
.form-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; }
.form-input { padding: 10px; border: 1px solid #dbe3ee; border-radius: 6px; font-size: 13px; color: #334155; }
.form-input:focus { outline: none; border-color: #60a5fa; box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1); }

.pratos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
.prato-card { border: 1px solid #dbe3ee; border-radius: 8px; padding: 12px; display: flex; justify-content: space-between; align-items: flex-start; }
.prato-info h3 { margin: 0; font-size: 13px; font-weight: 600; color: #0f172a; }
.prato-preco { margin: 4px 0 0; font-size: 12px; color: #64748b; }
.btn-add, .btn-remove { border: none; background: #60a5fa; color: #fff; border-radius: 50%; width: 28px; height: 28px; cursor: pointer; font-weight: 700; transition: background 0.2s; }
.btn-add:hover { background: #2563eb; }
.btn-remove { background: #10b981; }
.btn-remove:hover { background: #059669; }

.selecionados { border-top: 1px solid #e8eaf0; padding-top: 16px; }
.selecionados h2 { margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #0f172a; }
.itens-lista { display: flex; flex-direction: column; gap: 8px; }
.item-selecionado { display: flex; justify-content: space-between; align-items: center; padding: 8px; background: #f8fafc; border-radius: 6px; font-size: 13px; }
.muted { color: #94a3b8; font-size: 12px; }

.resumo { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; }
.resumo-item { display: flex; justify-content: space-between; font-size: 13px; color: #475569; }
.resumo-item.total { border-top: 1px solid #e2e8f0; padding-top: 8px; margin-top: 8px; font-size: 15px; font-weight: 700; color: #0f172a; }

.btn-submit { width: 100%; padding: 12px; border: none; background: #2563eb; color: #fff; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
.btn-submit:hover:not(:disabled) { background: #1d4ed8; }
.btn-submit:disabled { opacity: 0.7; cursor: wait; }
</style>
