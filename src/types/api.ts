
export type StatusPedido =
  | 'PENDENTE'
  | 'EM_PREPARO'
  | 'PRONTO'
  | 'ENTREGUE'
  | 'CANCELADO'

export interface PedidoResponse {
  idPedido: number
  status: string
  formpag: string      
  idCliente: number
  nome: string         
}

export interface PratoResponse {
  idPrato: number
  nome: string
  descricao: string
  preco: number
  idRestaurante: number
  pedidos: PedidoResumido[]
  produtosEstoque: ProdutoEstoqueResumido[]
}

export interface PedidoResumido {
  idPedido: number
  status: string
  formpag: string
}

export interface ProdutoEstoqueResumido {
  idProdutoEstoque: number
  nome: string
}

export interface ClienteResponse {
  idCliente: number
  nome: string
  email: string
  pedidos: PedidoResponse[]
}

export interface EstoqueResponse {
  idProduto: number
  quantidade: number
  nome: string
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
