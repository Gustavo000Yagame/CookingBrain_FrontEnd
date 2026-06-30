import { http } from './http'

export interface RestauranteResponse {
  idRestaurante: number
  nome: string
  endereco?: string
  telefone?: string
  categoria?: string
}

export interface RestauranteRequest {
  nome: string
  endereco?: string
  telefone?: string
  categoria?: string
}

export const restaurantesService = {
  listar: () => http.get<RestauranteResponse[]>('/restaurantes'),
  buscarPorId: (id: number) => http.get<RestauranteResponse>(`/restaurantes/${id}`),
  salvar: (dto: RestauranteRequest) => http.post<RestauranteResponse>('/restaurantes', dto),
  atualizar: (id: number, dto: RestauranteRequest) => http.put<RestauranteResponse>(`/restaurantes/${id}`, dto),
  deletar: (id: number) => http.delete<void>(`/restaurantes/${id}`),
}
