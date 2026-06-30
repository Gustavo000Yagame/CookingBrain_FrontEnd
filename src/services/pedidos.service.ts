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
  alterarStatus: (id: number, status: string) =>
    http.patch<PedidoResponse>(`/pedidos/${id}/status`, { status }),
  deletar: (id: number) => http.delete<void>(`/pedidos/${id}`),
}
