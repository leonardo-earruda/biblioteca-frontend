import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CustomDialogService } from 'src/app/core/services/custom-dialog.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { DefaultPaginatorSortDirective } from 'src/app/shared/utils/pagination-sorting/default-paginator-sort';
import { CriarLivroComponent } from '../../components/criar-livro/criar-livro.component';
import { LivroListaDTO } from '../../dto/livro/livro-lista-dto';
import { LivroService } from '../../services/livro.service';

@Component({
  selector: 'app-livro-page',
  templateUrl: './livro-page.component.html',
  styleUrls: ['./livro-page.component.scss'],
})
export class LivroPageComponent extends DefaultPaginatorSortDirective<LivroListaDTO> implements OnInit {
  dataSource: MatTableDataSource<LivroListaDTO>;
  displayedColumns = ['titulo', 'dataPublicacao', 'editora', 'generoLiterario', 'isbn', 'actions'];
  filter: string;

  constructor(
    private livroService: LivroService,
    public dialog: MatDialog,
    private customDialogService: CustomDialogService,
    private snackbarService: SnackbarService,
  ) {
    super(livroService, 'titulo');
  }

  ngOnInit(): void {
    super.init();
    this._loadData();
  }

  private _openDialog(livro?: LivroListaDTO): void {
    const dialogRef = this.dialog
      .open(CriarLivroComponent, {
        data: livro,
      })
      .afterClosed()
      .subscribe(() => {
        this._loadData();
      });
  }

  public criarLivro(): void {
    this._openDialog({});
  }

  public editarLivro(livro: LivroListaDTO): void {
    this.livroService.findById(livro.id).subscribe((res) => {
      this._openDialog(res);
    });
  }

  public excluirLivro(livro: LivroListaDTO): void {
    this.customDialogService.openConfirmDialog().subscribe((res) => {
      if (res) {
        this._excluirLivro(livro.id);
      }
    });
  }

  private _excluirLivro(id: string): void {
    this.livroService.removeById(id).subscribe((res) => {
      this.snackbarService.openSuccessSnackbar('Livro deletado com sucesso!');
      this.handleReloadAfterDelete();
    });
  }
}
