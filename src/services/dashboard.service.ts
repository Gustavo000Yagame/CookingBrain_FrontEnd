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

  const resumoPedidos: ResumoPedidos = {
    total: pedidos.length,
    pendentes:   pedidos.filter(p => p.status?.toUpperCase() === 'PENDENTE').length,
    emPreparo:   pedidos.filter(p => p.status?.toUpperCase() === 'EM_PREPARO' || p.status?.toUpperCase() === 'EM PREPARO').length,
    prontos:     pedidos.filter(p => p.status?.toUpperCase() === 'PRONTO').length,
    entregues:   pedidos.filter(p => p.status?.toUpperCase() === 'ENTREGUE').length,
    cancelados:  pedidos.filter(p => p.status?.toUpperCase() === 'CANCELADO').length,
  }

  const produtosMaisVendidos: ProdutoMaisVendido[] = pratos
    .map(p => ({
      produtoId: p.idPrato,
      nome: p.nome,
      quantidade: p.pedidos?.length ?? 0,
      receita: (p.pedidos?.length ?? 0) * (p.preco ?? 0),
    }))
    .sort((a, b) => b.quantidade - a.quantidade)
    .slice(0, 10)

  const pedidosAtivos = pedidos.filter(
    p => !['CANCELADO'].includes(p.status?.toUpperCase())
  )
  const faturamentoTotal = pratos.reduce((acc, prato) => {
    const pedidosDoPrato = prato.pedidos?.filter(
      pp => !['CANCELADO'].includes(pp.status?.toUpperCase())
    ) ?? []
    return acc + pedidosDoPrato.length * (prato.preco ?? 0)
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
