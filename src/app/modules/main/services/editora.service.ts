import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FindPageableStrategy } from 'src/app/shared/utils/pagination-sorting/find-pageable-strategy';
import { PageableResponse } from 'src/app/shared/utils/pagination-sorting/pageable-response.model';
import { environment } from 'src/environments/environment';
import { DropdownDTO } from '../dto/dropdown/dropdown-dto';
import { EditoraByIdDTO } from '../dto/editora/editora-by-id-dto';
import { EditoraCriarAtualizarDTO } from '../dto/editora/editora-dto';
import { EditoraListaDTO } from '../dto/editora/editora-lista-dto';

@Injectable({
  providedIn: 'root',
})
export class EditoraService implements FindPageableStrategy {
  private url = `${environment.baseUrl}/editoras`;

  constructor(private http: HttpClient) {
  }

  findPageable(params: any): Observable<PageableResponse<EditoraListaDTO>> {
    return this.http.get<PageableResponse<EditoraListaDTO>>(`${this.url}`, {
      params,
    });
  }

  criarEditora(body: EditoraCriarAtualizarDTO): Observable<void> {
    return this.http.post<void>(`${this.url}`, body);
  }

  findById(id: string): Observable<EditoraByIdDTO> {
    return this.http.get<EditoraByIdDTO>(`${this.url}/${id}`);
  }

  editarEditora(body: EditoraByIdDTO, id: string): Observable<EditoraByIdDTO> {
    return this.http.put<EditoraByIdDTO>(`${this.url}/${id}`, body);
  }

  deletarEditora(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  findForDropdown(): Observable<DropdownDTO[]> {
    return this.http.get<DropdownDTO[]>(`${this.url}/dropdown`);
  }
}
