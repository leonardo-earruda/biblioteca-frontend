import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AutorCriarAtualizarDTO } from '../dto/autor/autor-dto';
import { AutorListaDTO } from '../dto/autor/autor-lista-dto';
import { FindPageableStrategy } from '../../../shared/utils/pagination-sorting/find-pageable-strategy';
import { PageableResponse } from '../../../shared/utils/pagination-sorting/pageable-response.model';
import { DropdownDTO } from '../dto/dropdown/dropdown-dto';

@Injectable({
  providedIn: 'root',
})
export class AutorService implements FindPageableStrategy {
  private url = `${environment.baseUrl}/autores`;

  constructor(private http: HttpClient) {
  }

  criarAutor(request: AutorCriarAtualizarDTO): Observable<void> {
    return this.http.post<void>(`${this.url}`, request);
  }

  findPageable(params: any): Observable<PageableResponse<AutorListaDTO>> {
    return this.http.get<PageableResponse<AutorListaDTO>>(`${this.url}`, {
      params,
    });
  }

  findById(id: string): Observable<AutorListaDTO> {
    return this.http.get<AutorListaDTO>(`${this.url}/${id}`);
  }

  removeById(id: string): Observable<AutorListaDTO> {
    return this.http.delete<AutorListaDTO>(`${this.url}/${id}`);
  }

  edit(request: AutorCriarAtualizarDTO, id: string): Observable<AutorCriarAtualizarDTO> {
    return this.http.put<AutorCriarAtualizarDTO>(`${this.url}/${id}`, request);
  }

  findForDropdown(): Observable<DropdownDTO[]> {
    return this.http.get<DropdownDTO[]>(`${this.url}/dropdown`);
  }
}
