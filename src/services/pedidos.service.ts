import { http } from './http'

export interface PedidoResponse {
  idPedido: number
  status: string
  formpag: string
  idCliente: number
  nome: string
  itens?: Array<{ idPrato: number; nome: string; quantidade?: number }>
}

export interface PedidoRequest {
  status: string
  formaPag: string
  clienteId: number
  pratos: { idPrato: number }[]
}

export const pedidosService = {
  listar: () => http.get<PedidoResponse[]>('/pedidos'),
  buscarPorId: (id: number) => http.get<PedidoResponse>(`/pedidos/${id}`),
  salvar: (dto: PedidoRequest) => http.post<PedidoResponse>('/pedidos', dto),
  atualizar: (id: number, dto: PedidoRequest) => http.put<PedidoResponse>(`/pedidos/${id}`, dto),
  alterarStatus: (id: number, status: string, pedido: PedidoResponse) =>
    http.put<PedidoResponse>(`/pedidos/${id}`, {
      status,
      formaPag: pedido.formpag ?? '',
      clienteId: pedido.idCliente ?? 0,
      pratos: (pedido.itens ?? []).map(item => ({ idPrato: item.idPrato })),
    }),
  deletar: (id: number) => http.delete<void>(`/pedidos/${id}`),
}
