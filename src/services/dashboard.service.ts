import { http } from './http'
import type {
  DashboardData,
  ResumoFinanceiro,
  ResumoPedidos,
  ProdutoMaisVendido,
  VendaDiaria,
} from '@/interface/api'

async function fetchDashboard(): Promise<DashboardData> {
  try {

    return await http.get<DashboardData>('/api/dashboard')
  } catch {
    const [financeiro, pedidos, produtos, vendas, clientes] = await Promise.all([
      http.get<ResumoFinanceiro>('/api/dashboard/financeiro').catch(() => null),
      http.get<ResumoPedidos>('/api/dashboard/pedidos/resumo').catch(() => null),
      http.get<ProdutoMaisVendido[]>('/api/dashboard/produtos/mais-vendidos').catch(() => []),
      http.get<VendaDiaria[]>('/api/dashboard/vendas/historico').catch(() => []),
      http.get<{ total: number }>('/api/dashboard/clientes/atendidos').catch(() => null),
    ])

    return {
      financeiro: financeiro ?? {
        faturamentoDiario: 0,
        faturamentoSemanal: 0,
        faturamentoMensal: 0,
        ticketMedio: 0,
      },
      pedidos: pedidos ?? {
        total: 0, pendentes: 0, emPreparo: 0,
        prontos: 0, entregues: 0, cancelados: 0,
      },
      produtosMaisVendidos: (produtos as ProdutoMaisVendido[]) ?? [],
      vendasPorDia: (vendas as VendaDiaria[]) ?? [],
      clientesAtendidos: clientes?.total ?? 0,
    }
  }
}

export const dashboardService = { fetchDashboard }
