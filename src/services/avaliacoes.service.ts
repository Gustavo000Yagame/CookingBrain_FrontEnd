import { http } from './http'

export interface PratoResumido {
  idPrato: number
  nome: string
  descricao: string
  preco: number
  idRestaurante: number
}

export interface AvaliacaoResponse {
  idAvaliacao: number
  nota: number
  comentario: string | null
  prato: PratoResumido
}

export interface AvaliacaoRequest {
  nota: number
  comentario?: string
  idPrato: number
}

export const avaliacoesService = {
  listar: () => http.get<AvaliacaoResponse[]>('/avaliacoes'),
  buscarPorId: (id: number) => http.get<AvaliacaoResponse>(`/avaliacoes/${id}`),
  criar: (dto: AvaliacaoRequest) => http.post<AvaliacaoResponse>('/avaliacoes', dto),
  atualizar: (id: number, dto: AvaliacaoRequest) => http.put<AvaliacaoResponse>(`/avaliacoes/${id}`, dto),
  deletar: (id: number) => http.delete<void>(`/avaliacoes/${id}`),
  buscarPorNota: (nota: number) => http.get<AvaliacaoResponse[]>(`/avaliacoes/buscar/avaliacao?nota=${nota}`),
}
