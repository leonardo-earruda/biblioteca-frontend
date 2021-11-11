import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CustomDialogService } from 'src/app/core/services/custom-dialog.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { DefaultPaginatorSortDirective } from 'src/app/shared/utils/pagination-sorting/default-paginator-sort';
import { CriarGeneroLiterarioComponent } from '../../components/criar-genero-literario/criar-genero-literario.component';
import { GeneroLiterarioListaDTO } from '../../dto/genero-literario/generoliterario-lista-dto';
import { GeneroLiterarioService } from '../../services/genero-literario.service';

@Component({
  selector: 'app-genero-literario-page',
  templateUrl: './genero-literario-page.component.html',
  styleUrls: ['./genero-literario-page.component.scss'],
})
export class GeneroLiterarioPageComponent
  extends DefaultPaginatorSortDirective<GeneroLiterarioListaDTO>
  implements OnInit {
  dataSource: MatTableDataSource<GeneroLiterarioListaDTO>;
  filter: string;
  displayedColumns = ['nome', 'actions'];

  constructor(
    private generoService: GeneroLiterarioService,
    private dialog: MatDialog,
    private customDialogService: CustomDialogService,
    private snackBarService: SnackbarService,
  ) {
    super(generoService, 'nome');
  }

  ngOnInit(): void {
    super.init();
    this._loadData();
  }

  private _openDialog(genero?: GeneroLiterarioListaDTO): void {
    const dialogRef = this.dialog
      .open(CriarGeneroLiterarioComponent, {
        data: genero,
      })
      .afterClosed()
      .subscribe(() => {
        this._loadData();
      });
  }

  public adicionarGeneroLiterario(): void {
    this._openDialog({});
  }

  public editarGeneroLiterario(genero: GeneroLiterarioListaDTO): void {
    this.generoService.findById(genero.id).subscribe((res) => {
      this._openDialog(res);
    });
  }

  private _deletarGeneroLiterario(id: string): void {
    this.generoService.deletar(id).subscribe((res) => {
      this.snackBarService.openSuccessSnackbar('Genero literário excluído com sucesso');
      this.handleReloadAfterDelete();
    });
  }

  public deletarGeneroLiterario(genero: GeneroLiterarioListaDTO): void {
    this.customDialogService.openConfirmDialog().subscribe((res) => {
      if (res) {
        this._deletarGeneroLiterario(genero.id);
      }
    });
  }
}
