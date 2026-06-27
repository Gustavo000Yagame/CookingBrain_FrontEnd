import { http } from './http'

export interface EstoqueResponse {
  idProduto: number
  quantidade: number
  nome: string
}

export interface EstoqueRequest {
  nome: string
  quantidade: number
}

export const estoqueService = {
  listar: ()                                    => http.get<EstoqueResponse[]>('/estoque'),
  buscarPorId: (id: number)                     => http.get<EstoqueResponse>(`/estoque/${id}`),
  salvar: (dto: EstoqueRequest)                 => http.post<EstoqueResponse>('/estoque', dto),
  atualizar: (id: number, dto: EstoqueRequest)  => http.put<EstoqueResponse>(`/estoque/${id}`, dto),
  deletar: (id: number)                         => http.delete<void>(`/estoque/${id}`),
}
