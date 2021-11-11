import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FindPageableStrategy } from 'src/app/shared/utils/pagination-sorting/find-pageable-strategy';
import { PageableResponse } from 'src/app/shared/utils/pagination-sorting/pageable-response.model';
import { environment } from 'src/environments/environment';
import { LocacaoListaDTO } from '../dto/locacao/locacao-lista-dto';
import { LocacaoCriarDto } from '../dto/locacao/locacao-criar-dto';

@Injectable({
  providedIn: 'root',
})
export class LocacaoService implements FindPageableStrategy {
  private url = `${environment.baseUrl}/locacoes`;

  constructor(private http: HttpClient) {}

  findPageable(params: any): Observable<PageableResponse<LocacaoListaDTO>> {
    return this.http.get<PageableResponse<LocacaoListaDTO>>(`${this.url}`, {
      params,
    });
  }

  criarLivro(body: LocacaoCriarDto): Observable<void> {
    return this.http.post<void>(`${this.url}`, body);
  }
}
