import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FindPageableStrategy } from '../../../shared/utils/pagination-sorting/find-pageable-strategy';
import { PageableResponse } from '../../../shared/utils/pagination-sorting/pageable-response.model';
import { CepDTO } from '../dto/cep/cep-dto';
import { ClienteByIdDTO } from '../dto/cliente/cliente-by-id-dto';
import { ClienteCriarAtualizarDTO } from '../dto/cliente/cliente-dto';
import { ClienteListaDTO } from '../dto/cliente/cliente-lista-dto';
import { ClienteByCpfDto } from '../dto/cliente/cliente-by-cpf-dto';

@Injectable({
  providedIn: 'root',
})
export class ClienteService implements FindPageableStrategy {
  private url = `${environment.baseUrl}/clientes`;

  constructor(private http: HttpClient) {}

  findPageable(params: any): Observable<PageableResponse<ClienteListaDTO>> {
    return this.http.get<PageableResponse<ClienteListaDTO>>(`${this.url}`, {
      params,
    });
  }

  criarCliente(body: ClienteCriarAtualizarDTO): Observable<void> {
    return this.http.post<void>(`${this.url}`, body);
  }

  findById(id: string): Observable<ClienteByIdDTO> {
    return this.http.get<ClienteByIdDTO>(`${this.url}/${id}`);
  }

  editarCliente(body: ClienteCriarAtualizarDTO, id: string): Observable<ClienteCriarAtualizarDTO> {
    return this.http.put<ClienteCriarAtualizarDTO>(`${this.url}/${id}`, body);
  }

  deletarCliente(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  buscarCEP(cep: string): Observable<CepDTO> {
    return this.http.get<CepDTO>(`//viacep.com.br/ws/${cep}/json`);
  }

  findClienteByCpf(res: string): Observable<ClienteByCpfDto> {
    return this.http.get<ClienteByCpfDto>(`${this.url}/cpf/${res}`);
  }
}
