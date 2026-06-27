import { http } from './http'

export interface PratoResponse {
  idPrato: number
  nome: string
  descricao: string
  preco: number
  idRestaurante: number
  pedidos: { idPedido: number; status: string; formpag: string }[]
  produtosEstoque: { idProdutoEstoque: number; nome: string }[]
}

export interface PratoRequest {
  nome: string
  descricao: string
  preco: number
  idRestaurante: number
}

export const pratosService = {
  listar: ()                         => http.get<PratoResponse[]>('/pratos'),
  buscarPorId: (id: number)          => http.get<PratoResponse>(`/pratos/${id}`),
  buscarPorNome: (nome: string)      => http.get<PratoResponse[]>(`/pratos/buscarPrato/nome?nome=${encodeURIComponent(nome)}`),
  salvar: (dto: PratoRequest)        => http.post<PratoResponse>('/pratos', dto),
  atualizar: (id: number, dto: PratoRequest) => http.put<PratoResponse>(`/pratos/${id}`, dto),
  deletar: (id: number)              => http.delete<void>(`/pratos/${id}`),
}
