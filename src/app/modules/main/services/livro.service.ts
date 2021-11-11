import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FindPageableStrategy } from 'src/app/shared/utils/pagination-sorting/find-pageable-strategy';
import { PageableResponse } from 'src/app/shared/utils/pagination-sorting/pageable-response.model';
import { environment } from 'src/environments/environment';
import { LivroByIdDTO } from '../dto/livro/livro-by-id-dto.model';
import { LivroCriarAtualizarDTO } from '../dto/livro/livro-dto';
import { LivroListaDTO } from '../dto/livro/livro-lista-dto';
import { LivroByIsbnDTO } from '../dto/livro/livro-by-isbn-dto';

@Injectable({
  providedIn: 'root',
})
export class LivroService implements FindPageableStrategy {
  private url = `${environment.baseUrl}/livros`;

  constructor(private http: HttpClient) {
  }

  findPageable(params: any): Observable<PageableResponse<LivroListaDTO>> {
    return this.http.get<PageableResponse<LivroListaDTO>>(`${this.url}`, {
      params,
    });
  }

  criarLivro(body: LivroCriarAtualizarDTO): Observable<void> {
    return this.http.post<void>(`${this.url}`, body);
  }

  removeById(id: string): Observable<LivroListaDTO> {
    return this.http.delete<LivroListaDTO>(`${this.url}/${id}`);
  }

  findById(id: string): Observable<LivroByIdDTO> {
    return this.http.get<LivroByIdDTO>(`${this.url}/${id}`);
  }

  edit(body: LivroCriarAtualizarDTO, id: string): Observable<LivroCriarAtualizarDTO> {
    return this.http.put<LivroCriarAtualizarDTO>(`${this.url}/${id}`, body);
  }

  findLivroByIsbn(res: string): Observable<LivroByIsbnDTO> {
    return this.http.get<LivroByIsbnDTO>(`${this.url}/isbn/${res}`);
  }

}
