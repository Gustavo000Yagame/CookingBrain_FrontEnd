import { http } from './http'
import type {
  DashboardData,
  ResumoPedidos,
  ProdutoMaisVendido,
  VendaDiaria,
  ResumoFinanceiro,
} from '@/types/api'

interface PedidoRaw {
  idPedido: number
  status: string
  formpag: string
  idCliente: number
  nome: string
}

interface PratoRaw {
  idPrato: number
  nome: string
  descricao: string
  preco: number
  idRestaurante: number
  pedidos: { idPedido: number; status: string; formpag: string }[]
}

interface ClienteRaw {
  idCliente: number
  nome: string
  email: string
  pedidos: PedidoRaw[]
}

export async function fetchDashboard(): Promise<DashboardData> {
  const [pedidos, pratos, clientes] = await Promise.all([
    http.get<PedidoRaw[]>('/pedidos'),
    http.get<PratoRaw[]>('/pratos'),
    http.get<ClienteRaw[]>('/clientes'),
  ])

  const normalize = (s?: string | null) => (s ?? '').toUpperCase().trim()

  const resumoPedidos: ResumoPedidos = {
    total:     pedidos.length,
    pendentes: pedidos.filter(p => normalize(p.status) === 'PENDENTE').length,
    emPreparo: pedidos.filter(p => ['EM_PREPARO', 'EM PREPARO'].includes(normalize(p.status))).length,
    prontos:   pedidos.filter(p => normalize(p.status) === 'PRONTO').length,
    entregues: pedidos.filter(p => normalize(p.status) === 'ENTREGUE').length,
    cancelados:pedidos.filter(p => normalize(p.status) === 'CANCELADO').length,
  }

  const produtosMaisVendidos: ProdutoMaisVendido[] = pratos
    .map(p => ({
      produtoId: p.idPrato,
      nome: p.nome ?? `Prato ${p.idPrato}`,
      quantidade: p.pedidos?.length ?? 0,
      receita: (p.pedidos?.length ?? 0) * (p.preco ?? 0),
    }))
    .filter(p => p.quantidade > 0)
    .sort((a, b) => b.quantidade - a.quantidade)
    .slice(0, 10)

  const pedidosAtivos = pedidos.filter(p => normalize(p.status) !== 'CANCELADO')

  const faturamentoTotal = pratos.reduce((acc, prato) => {
    const ativos = (prato.pedidos ?? []).filter(
      pp => normalize(pp.status) !== 'CANCELADO'
    )
    return acc + ativos.length * (prato.preco ?? 0)
  }, 0)

  const ticketMedio = pedidosAtivos.length > 0
    ? faturamentoTotal / pedidosAtivos.length
    : 0

  const financeiro: ResumoFinanceiro = {
    faturamentoDiario: 0,
    faturamentoSemanal: 0,
    faturamentoMensal: faturamentoTotal,
    ticketMedio,
  }

  const vendasPorDia: VendaDiaria[] = []

  return {
    financeiro,
    pedidos: resumoPedidos,
    produtosMaisVendidos,
    vendasPorDia,
    clientesAtendidos: clientes.length,
  }
}

export const dashboardService = { fetchDashboard }
