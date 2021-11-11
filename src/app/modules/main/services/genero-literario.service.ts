import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FindPageableStrategy } from '../../../shared/utils/pagination-sorting/find-pageable-strategy';
import { PageableResponse } from '../../../shared/utils/pagination-sorting/pageable-response.model';
import { GeneroLiterarioListaDTO } from '../dto/genero-literario/generoliterario-lista-dto';
import { GeneroLiterarioCriarAtualizarDTO } from '../dto/genero-literario/genero-literario-dto';
import { DropdownDTO } from '../dto/dropdown/dropdown-dto';
import { GeneroLiterarioByIdDTO } from '../dto/genero-literario/genero-literario-by-id-dto';

@Injectable({
  providedIn: 'root',
})
export class GeneroLiterarioService implements FindPageableStrategy {
  private url = `${environment.baseUrl}/generos-literarios`;

  constructor(private http: HttpClient) {
  }

  findPageable(params: any): Observable<PageableResponse<GeneroLiterarioListaDTO>> {
    return this.http.get<PageableResponse<GeneroLiterarioListaDTO>>(`${this.url}`, {
      params,
    });
  }

  criar(body: GeneroLiterarioCriarAtualizarDTO): Observable<void> {
    return this.http.post<void>(`${this.url}`, body);
  }

  findById(id: string): Observable<GeneroLiterarioByIdDTO> {
    return this.http.get<GeneroLiterarioByIdDTO>(`${this.url}/${id}`);
  }

  editar(body: GeneroLiterarioCriarAtualizarDTO, id: string): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, body);
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  findForDropdown(): Observable<DropdownDTO[]> {
    return this.http.get<DropdownDTO[]>(`${this.url}/dropdown`);
  }
}
