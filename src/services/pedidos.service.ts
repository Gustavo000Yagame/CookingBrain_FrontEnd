import { http } from './http'
import type { Pedido, PageResponse, StatusPedido } from '@/interface/api'

const BASE = '/api/pedidos'

export const pedidosService = {
  listar: (page = 0, size = 20) =>
    http.get<PageResponse<Pedido>>(`${BASE}?page=${page}&size=${size}`),

  buscarPorId: (id: number) =>
    http.get<Pedido>(`${BASE}/${id}`),

  listarPorStatus: (status: StatusPedido) =>
    http.get<Pedido[]>(`${BASE}?status=${status}`),

  atualizarStatus: (id: number, status: StatusPedido) =>
    http.patch<Pedido>(`${BASE}/${id}/status`, { status }),
}
