import { http } from './http'

export interface ClienteResponse {
  idCliente: number
  nome: string
  email: string
  pedidos: {
    idPedido: number
    status: string
    formpag: string
    idCliente: number
    nome: string
  }[]
}

export interface ClienteRequest {
  nome: string
  email: string
  telefone?: string
}

export const clientesService = {
  listar: ()                                   => http.get<ClienteResponse[]>('/clientes'),
  buscarPorId: (id: number)                    => http.get<ClienteResponse>(`/clientes/${id}`),
  buscarPorNome: (nome: string)                => http.get<ClienteResponse[]>(`/clientes/buscar/${encodeURIComponent(nome)}`),
  salvar: (dto: ClienteRequest)                => http.post<ClienteResponse>('/clientes', dto),
  atualizar: (id: number, dto: ClienteRequest) => http.put<ClienteResponse>(`/clientes/${id}`, dto),
  deletar: (id: number)                        => http.delete<void>(`/clientes/${id}`),
  me: ()                                       => http.get<ClienteResponse>('/clientes/me'),
}
