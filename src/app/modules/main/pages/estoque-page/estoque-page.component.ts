import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DefaultPaginatorSortDirective } from 'src/app/shared/utils/pagination-sorting/default-paginator-sort';
import { EstoqueListaDTO } from '../../dto/estoque/estoque-lista-dto';
import { EstoqueService } from '../../services/estoque.service';

@Component({
  selector: 'app-estoque-page',
  templateUrl: './estoque-page.component.html',
  styleUrls: ['./estoque-page.component.scss'],
})
export class EstoquePageComponent extends DefaultPaginatorSortDirective<EstoqueListaDTO> implements OnInit {
  dataSource: MatTableDataSource<EstoqueListaDTO>;
  displayedColumns = ['id', 'livro.titulo', 'quantidadeDisponivel'];
  filter: string;

  constructor(private estoqueService: EstoqueService) {
    super(estoqueService, 'livro.titulo');
  }

  ngOnInit(): void {
    super.init();
    this._loadData();
  }
}
