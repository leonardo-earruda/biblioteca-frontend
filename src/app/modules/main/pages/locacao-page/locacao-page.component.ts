import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DefaultPaginatorSortDirective } from 'src/app/shared/utils/pagination-sorting/default-paginator-sort';
import { LocacaoListaDTO } from '../../dto/locacao/locacao-lista-dto';
import { LocacaoService } from '../../services/locacao.service';
import { MatDialog } from '@angular/material/dialog';
import { CriarLocacaoComponent } from '../../components/criar-locacao/criar-locacao/criar-locacao.component';

@Component({
  selector: 'app-locacao-page',
  templateUrl: './locacao-page.component.html',
  styleUrls: ['./locacao-page.component.scss'],
})
export class LocacaoPageComponent extends DefaultPaginatorSortDirective<LocacaoListaDTO> implements OnInit {
  dataSource: MatTableDataSource<LocacaoListaDTO>;
  displayedColumns = ['dataLocacao', 'dataPrevistaDevolucao', 'dataDevolucao', 'situacao', 'cliente.nome'];
  filter: string;

  constructor(private locacaoService: LocacaoService, private dialog: MatDialog) {
    super(locacaoService, 'dataLocacao');
  }

  ngOnInit(): void {
    super.init();
    this._loadData();
  }

  private _openDialog(): void {
    this.dialog
      .open(CriarLocacaoComponent, { data: {} })
      .afterClosed()
      .subscribe(() => {
        this._loadData();
      });
  }

  public criarLocacao(): void {
    this._openDialog();
  }
}
