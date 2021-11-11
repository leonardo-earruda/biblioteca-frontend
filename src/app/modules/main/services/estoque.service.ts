import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FindPageableStrategy } from 'src/app/shared/utils/pagination-sorting/find-pageable-strategy';
import { PageableResponse } from 'src/app/shared/utils/pagination-sorting/pageable-response.model';
import { environment } from 'src/environments/environment';
import { EstoqueListaDTO } from '../dto/estoque/estoque-lista-dto';

@Injectable({
  providedIn: 'root',
})
export class EstoqueService implements FindPageableStrategy {
  private url = `${environment.baseUrl}/estoque`;

  constructor(private http: HttpClient) {}

  findPageable(params: any): Observable<PageableResponse<EstoqueListaDTO>> {
    return this.http.get<PageableResponse<EstoqueListaDTO>>(`${this.url}`, {
      params,
    });
  }
}
