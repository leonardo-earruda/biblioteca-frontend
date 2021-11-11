import { Observable } from 'rxjs';
import { PageableRequest } from './pageable-request.model';
import { PageableResponse } from './pageable-response.model';

export interface FindPageableStrategy {
  findPageable(params: PageableRequest): Observable<PageableResponse<any>>;
}
