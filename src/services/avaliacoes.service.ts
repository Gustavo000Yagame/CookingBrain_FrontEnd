import { http } from './http'

export interface AvaliacaoResponse {
  idAvaliacao: number
  idPedido: number
  categoria: string
  valor: number
  comentario?: string
  dataCriacao?: string
}

export interface AvaliacaoRequest {
  idPedido: number
  categoria: string
  valor: number
  comentario?: string
}

export const avaliacoesService = {
  listar: () => http.get<AvaliacaoResponse[]>('/avaliacoes'),
  buscarPorPedido: (idPedido: number) => http.get<AvaliacaoResponse[]>(`/avaliacoes/pedido/${idPedido}`),
  criar: (dto: AvaliacaoRequest) => http.post<AvaliacaoResponse>('/avaliacoes', dto),
  atualizar: (id: number, dto: AvaliacaoRequest) => http.put<AvaliacaoResponse>(`/avaliacoes/${id}`, dto),
  deletar: (id: number) => http.delete<void>(`/avaliacoes/${id}`),
}
