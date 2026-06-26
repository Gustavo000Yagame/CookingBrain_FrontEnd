export type StatusPedido =
  | 'PENDENTE'
  | 'EM_PREPARO'
  | 'PRONTO'
  | 'ENTREGUE'
  | 'CANCELADO'

export interface Pedido {
  id: number
  numeroPedido: string
  status: StatusPedido
  total: number
  createdAt: string
  clienteNome?: string
  itens?: ItemPedido[]
}

export interface ItemPedido {
  produtoId: number
  nomeProduto: string
  quantidade: number
  precoUnitario: number
}

export interface Produto {
  id: number
  nome: string
  preco: number
  categoria: string
  ativo: boolean
}

export interface Cliente {
  id: number
  nome: string
  email: string
  telefone?: string
  createdAt: string
}

export interface ResumoFinanceiro {
  faturamentoDiario: number
  faturamentoSemanal: number
  faturamentoMensal: number
  ticketMedio: number
}

export interface ResumoPedidos {
  total: number
  pendentes: number
  emPreparo: number
  prontos: number
  entregues: number
  cancelados: number
}

export interface ProdutoMaisVendido {
  produtoId: number
  nome: string
  quantidade: number
  receita: number
}

export interface VendaDiaria {
  data: string
  faturamento: number
  quantidadePedidos: number
}

export interface DashboardData {
  financeiro: ResumoFinanceiro
  pedidos: ResumoPedidos
  produtosMaisVendidos: ProdutoMaisVendido[]
  vendasPorDia: VendaDiaria[]
  clientesAtendidos: number
}


export interface ApiResponse<T> {
  data: T | null
  error: string | null
  loading: boolean
}

export interface PageResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}
