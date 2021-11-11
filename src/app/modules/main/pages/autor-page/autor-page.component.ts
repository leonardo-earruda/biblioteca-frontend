import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AutorService } from 'src/app/modules/main/services/autor.service';
import { DefaultPaginatorSortDirective } from 'src/app/shared/utils/pagination-sorting/default-paginator-sort';
import { CustomDialogService } from 'src/app/core/services/custom-dialog.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { CriarAutorComponent } from '../../components/criar-autor/criar-autor.component';
import { AutorListaDTO } from '../../dto/autor/autor-lista-dto';

@Component({
  selector: 'app-autor-page',
  templateUrl: './autor-page.component.html',
  styleUrls: ['./autor-page.component.scss'],
})
export class AutorPageComponent extends DefaultPaginatorSortDirective<AutorListaDTO> implements OnInit {
  dataSource: MatTableDataSource<AutorListaDTO>;
  displayedColumns = ['nome', 'nacionalidade', 'dataNascimento', 'actions'];
  filter: string;

  constructor(
    private autorService: AutorService,
    private dialog: MatDialog,
    private customDialogService: CustomDialogService,
    private snackBarService: SnackbarService
  ) {
    super(autorService, 'nome');
  }

  ngOnInit(): void {
    super.init();
    this._loadData();
  }

  private _openDialog(autor?: AutorListaDTO): void {
    const dialogRef = this.dialog
      .open(CriarAutorComponent, {
        data: autor,
      })
      .afterClosed()
      .subscribe(() => {
        this._loadData();
      });
  }

  public criarAutor(): void {
    this._openDialog({});
  }

  public editarAutor(autor: AutorListaDTO): void {
    this.autorService.findById(autor.id).subscribe((res) => {
      this._openDialog(res);
    });
  }

  public deletarAutor(autor: AutorListaDTO): void {
    this.customDialogService.openConfirmDialog().subscribe((res) => {
      if (res) {
        this._deletarAutor(autor.id);
      }
    });
  }

  private _deletarAutor(autorId: string) {
    this.autorService.removeById(autorId).subscribe((res) => {
      this.snackBarService.openSuccessSnackbar('Autor excluído com sucesso');
      this.handleReloadAfterDelete();
    });
  }
}
