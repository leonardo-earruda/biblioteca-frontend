import { DEFAULT_PAGE_SIZES } from 'src/app/configs/paginator.config';

export class PageableRequest {
  filter: string;
  page: number;
  linesPerPage: number;
  direction: string;
  orderBy: string;

  constructor(orderBy: string, filter: string, page: number, linesPerPage: number, direction: string) {
    this.filter = filter.toUpperCase() ? filter : '';
    this.page = page || 0;
    this.linesPerPage = linesPerPage || DEFAULT_PAGE_SIZES[0];
    this.direction = direction || 'ASC';
    this.orderBy = orderBy;
  }
}
