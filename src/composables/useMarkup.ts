import { ref, computed } from 'vue'

const STORAGE_KEY = 'cookingbrain:custos'
const MARKUP_KEY  = 'cookingbrain:markup_minimo'

function loadCustos(): Record<number, number> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') }
  catch { return {} }
}

function saveCustos(c: Record<number, number>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(c))
}

const markupMinimo = ref<number>(Number(localStorage.getItem(MARKUP_KEY) ?? 40))

export function useMarkup() {
  const custos = ref<Record<number, number>>(loadCustos())

  function setCusto(idPrato: number, custo: number) {
    custos.value = { ...custos.value, [idPrato]: custo }
    saveCustos(custos.value)
  }

  function getCusto(idPrato: number): number {
    return custos.value[idPrato] ?? 0
  }

  function setMarkupMinimo(valor: number) {
    markupMinimo.value = valor
    localStorage.setItem(MARKUP_KEY, String(valor))
  }

  function calcMarkup(precoVenda: number, custo: number): number | null {
    if (!custo || custo <= 0) return null
    return ((precoVenda - custo) / custo) * 100
  }

  function calcMargem(precoVenda: number, custo: number): number | null {
    if (!custo || custo <= 0 || !precoVenda) return null
    return ((precoVenda - custo) / precoVenda) * 100
  }

  function precoSugerido(custo: number, markupPct: number): number {
    return custo * (1 + markupPct / 100)
  }

  function statusMarkup(markup: number | null): 'ok' | 'baixo' | 'sem-custo' {
    if (markup === null) return 'sem-custo'
    return markup >= markupMinimo.value ? 'ok' : 'baixo'
  }

  const markupMedioDoCardapio = computed(() => (pratos: { idPrato: number; preco: number }[]) => {
    const validos = pratos
      .map(p => calcMarkup(p.preco, getCusto(p.idPrato)))
      .filter((m): m is number => m !== null)
    if (!validos.length) return null
    return validos.reduce((a, b) => a + b, 0) / validos.length
  })

  return {
    custos,
    markupMinimo,
    setCusto,
    getCusto,
    setMarkupMinimo,
    calcMarkup,
    calcMargem,
    precoSugerido,
    statusMarkup,
    markupMedioDoCardapio,
  }
}
