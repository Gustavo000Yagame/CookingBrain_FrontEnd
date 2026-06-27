<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { pratosService, type PratoResponse } from '@/services/produtos.service'
import { useMarkup } from '@/composables/useMarkup'

const pratos = ref<PratoResponse[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const {
  getCusto, setCusto,
  calcMarkup, calcMargem, precoSugerido,
  statusMarkup, markupMinimo, setMarkupMinimo,
  markupMedioDoCardapio,
} = useMarkup()

const fmt = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

const fmtPct = (v: number | null) =>
  v === null ? '—' : v.toFixed(1) + '%'

const markupMedio = computed(() => markupMedioDoCardapio.value(pratos.value))

const custoInput = ref<Record<number, string>>({})

function onCustoBlur(idPrato: number) {
  const val = parseFloat(custoInput.value[idPrato]?.replace(',', '.') ?? '0')
  if (!isNaN(val) && val >= 0) setCusto(idPrato, val)
}

const statusColor: Record<string, string> = {
  ok: '#22c55e',
  baixo: '#f43f5e',
  'sem-custo': '#9ca3af',
}

const statusLabel: Record<string, string> = {
  ok: 'Saudável',
  baixo: 'Abaixo do mínimo',
  'sem-custo': 'Sem custo',
}

onMounted(async () => {
  try {
    pratos.value = await pratosService.listar()
    pratos.value.forEach(p => {
      custoInput.value[p.idPrato] = getCusto(p.idPrato) > 0
        ? getCusto(p.idPrato).toFixed(2)
        : ''
    })
  } catch (e: any) {
    error.value = e?.message ?? 'Erro ao carregar produtos.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">Produtos — Análise de Markup</h1>
      <div class="markup-config">
        <label class="config-label">Markup mínimo</label>
        <div class="config-input-wrap">
          <input
            type="number"
            class="config-input"
            :value="markupMinimo"
            min="1"
            max="999"
            @change="setMarkupMinimo(Number(($event.target as HTMLInputElement).value))"
          />
          <span class="config-suffix">%</span>
        </div>
      </div>
    </div>

    <div class="instrucao-box">
      <div class="instrucao-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="8"/><line x1="12" y1="12" x2="12" y2="16"/></svg>
      </div>
      <div>
        <p class="instrucao-titulo">Como usar a Precificação Inteligente</p>
        <p class="instrucao-texto">
          Informe o <strong>custo de produção</strong> de cada prato (ingredientes + insumos) na coluna "Custo".
          O sistema calcula automaticamente o <strong>markup</strong> (quanto % acima do custo você cobra),
          a <strong>margem de lucro</strong> e o <strong>preço mínimo sugerido</strong> para atingir o markup configurado.
          Os dados ficam salvos no seu navegador.
        </p>
      </div>
    </div>

    <div class="summary-row">
      <div class="summary-card">
        <p class="summary-label">Markup médio do cardápio</p>
        <p class="summary-value" :style="{ color: markupMedio !== null && markupMedio >= markupMinimo ? '#22c55e' : '#f43f5e' }">
          {{ markupMedio !== null ? markupMedio.toFixed(1) + '%' : '—' }}
        </p>
        <p class="summary-sub">
          {{ markupMedio === null
            ? 'Informe os custos abaixo'
            : markupMedio >= markupMinimo
              ? 'Acima do mínimo'
              : 'Abaixo do mínimo de ' + markupMinimo + '%' }}
        </p>
      </div>
      <div class="summary-card">
        <p class="summary-label">Pratos com custo cadastrado</p>
        <p class="summary-value">
          {{ pratos.filter(p => getCusto(p.idPrato) > 0).length }}/{{ pratos.length }}
        </p>
        <p class="summary-sub">Informe o custo para ver a análise</p>
      </div>
      <div class="summary-card">
        <p class="summary-label">Pratos abaixo do mínimo</p>
        <p class="summary-value" style="color:#f43f5e">
          {{ pratos.filter(p => {
            const m = calcMarkup(p.preco, getCusto(p.idPrato))
            return m !== null && m < markupMinimo
          }).length }}
        </p>
        <p class="summary-sub">Requerem atenção no preço ou custo</p>
      </div>
    </div>

    <div v-if="loading" class="loading-rows">
      <div v-for="i in 5" :key="i" class="skeleton-row" />
    </div>

    <div v-else-if="error" class="error-box">{{ error }}</div>

    <div v-else-if="pratos.length === 0" class="empty">
      Nenhum prato cadastrado ainda.
    </div>

    <div v-else class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Preço de Venda</th>
            <th>Custo (R$)</th>
            <th>Markup</th>
            <th>Margem</th>
            <th>Preço Sugerido</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in pratos" :key="p.idPrato">
            <td class="id-cell">{{ p.idPrato }}</td>
            <td class="bold-cell">{{ p.nome }}</td>
            <td>{{ fmt(p.preco) }}</td>
            <td>
              <div class="custo-input-wrap">
                <span class="custo-prefix">R$</span>
                <input
                  type="number"
                  class="custo-input"
                  :value="custoInput[p.idPrato]"
                  placeholder="0,00"
                  min="0"
                  step="0.01"
                  @input="custoInput[p.idPrato] = ($event.target as HTMLInputElement).value"
                  @blur="onCustoBlur(p.idPrato)"
                />
              </div>
            </td>
            <td>
              <span
                class="pct-value"
                :style="{
                  color: calcMarkup(p.preco, getCusto(p.idPrato)) !== null
                    ? (calcMarkup(p.preco, getCusto(p.idPrato))! >= markupMinimo ? '#22c55e' : '#f43f5e')
                    : '#9ca3af'
                }"
              >
                {{ fmtPct(calcMarkup(p.preco, getCusto(p.idPrato))) }}
              </span>
            </td>
            <td>
              <span class="pct-value" :style="{ color: calcMargem(p.preco, getCusto(p.idPrato)) !== null ? '#374151' : '#9ca3af' }">
                {{ fmtPct(calcMargem(p.preco, getCusto(p.idPrato))) }}
              </span>
            </td>
            <td class="sugerido-cell">
              <span v-if="getCusto(p.idPrato) > 0">{{ fmt(precoSugerido(getCusto(p.idPrato), markupMinimo)) }}</span>
              <span v-else class="muted">—</span>
            </td>
            <td>
              <span
                class="status-badge"
                :style="{
                  background: statusColor[statusMarkup(calcMarkup(p.preco, getCusto(p.idPrato)))] + '20',
                  color: statusColor[statusMarkup(calcMarkup(p.preco, getCusto(p.idPrato)))]
                }"
              >
                {{ statusLabel[statusMarkup(calcMarkup(p.preco, getCusto(p.idPrato)))] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="table-hint">Os custos são salvos no seu navegador. Informe o custo de cada prato para ver a análise completa.</p>
    </div>
  </div>
</template>

<style scoped>
.page { display: flex; flex-direction: column; gap: 20px; }
.page-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
.page-title { font-size: 20px; font-weight: 700; color: #0f172a; }
.markup-config { display: flex; align-items: center; gap: 10px; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 8px 14px; }
.config-label { font-size: 12px; color: #6b7280; font-weight: 500; white-space: nowrap; }
.config-input-wrap { display: flex; align-items: center; gap: 4px; }
.config-input { width: 64px; border: 1px solid #e2e8f0; border-radius: 6px; padding: 4px 8px; font-size: 14px; font-weight: 600; color: #0f172a; text-align: right; outline: none; }
.config-input:focus { border-color: #3b82f6; }
.config-suffix { font-size: 13px; color: #6b7280; font-weight: 600; }
.summary-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.summary-card { background: #fff; border: 1px solid #e8eaf0; border-radius: 12px; padding: 18px 20px; }
.summary-label { font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8b92a5; }
.summary-value { font-size: 28px; font-weight: 700; color: #111827; margin-top: 6px; line-height: 1; }
.summary-sub { font-size: 12px; color: #9ca3af; margin-top: 4px; }
.table-wrap { background: #fff; border-radius: 12px; border: 1px solid #e8eaf0; overflow: hidden; }
.data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.data-table thead { background: #f8fafc; }
.data-table th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: #6b7280; border-bottom: 1px solid #e8eaf0; white-space: nowrap; }
.data-table td { padding: 11px 16px; color: #374151; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
.data-table tbody tr:last-child td { border-bottom: none; }
.data-table tbody tr:hover td { background: #fafbfc; }
.id-cell { color: #9ca3af; font-size: 12px; }
.bold-cell { font-weight: 600; color: #111827; }
.custo-input-wrap { display: flex; align-items: center; gap: 4px; }
.custo-prefix { font-size: 12px; color: #6b7280; }
.custo-input { width: 80px; border: 1px solid #e2e8f0; border-radius: 6px; padding: 5px 8px; font-size: 13px; outline: none; transition: border-color 0.15s; }
.custo-input:focus { border-color: #3b82f6; }
.pct-value { font-weight: 600; font-size: 13px; }
.sugerido-cell { font-weight: 500; }
.muted { color: #d1d5db; }
.status-badge { padding: 3px 10px; border-radius: 100px; font-size: 11px; font-weight: 600; white-space: nowrap; }
.table-hint { font-size: 11px; color: #9ca3af; padding: 10px 16px; background: #f8fafc; border-top: 1px solid #f1f5f9; }
.instrucao-box {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 10px;
  padding: 14px 18px;
  color: #1e40af;
}
.instrucao-icon { flex-shrink: 0; margin-top: 1px; }
.instrucao-titulo { font-size: 13px; font-weight: 600; margin-bottom: 4px; }
.instrucao-texto { font-size: 12px; line-height: 1.6; color: #1d4ed8; }
.instrucao-texto strong { font-weight: 700; }
.loading-rows { display: flex; flex-direction: column; gap: 8px; }
.skeleton-row { height: 52px; border-radius: 8px; background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
.error-box { background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; border-radius: 8px; padding: 14px 16px; font-size: 13px; }
.empty { background: #fff; border-radius: 12px; border: 1px dashed #e2e8f0; padding: 48px; text-align: center; color: #94a3b8; font-size: 13px; }
@media (max-width: 900px) { .summary-row { grid-template-columns: 1fr; } }
</style>
