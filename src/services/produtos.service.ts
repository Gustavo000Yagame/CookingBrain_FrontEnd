import { http } from './http'
import type { Produto, PageResponse } from '@/interface/api'

const BASE = '/api/produtos'

export const produtosService = {
  listar: (page = 0, size = 50) =>
    http.get<PageResponse<Produto>>(`${BASE}?page=${page}&size=${size}`),

  buscarPorId: (id: number) =>
    http.get<Produto>(`${BASE}/${id}`),

  maisVendidos: (limite = 10) =>
    http.get<Produto[]>(`${BASE}/mais-vendidos?limite=${limite}`),
}
