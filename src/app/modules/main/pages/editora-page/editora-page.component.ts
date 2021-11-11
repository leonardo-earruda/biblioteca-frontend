import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CustomDialogService } from 'src/app/core/services/custom-dialog.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { DefaultPaginatorSortDirective } from 'src/app/shared/utils/pagination-sorting/default-paginator-sort';
import { CriarEditoraComponent } from '../../components/criar-editora/criar-editora.component';
import { EditoraListaDTO } from '../../dto//editora/editora-lista-dto';
import { EditoraService } from '../../services/editora.service';

@Component({
  selector: 'app-editora-page',
  templateUrl: './editora-page.component.html',
  styleUrls: ['./editora-page.component.scss'],
})
export class EditoraPageComponent extends DefaultPaginatorSortDirective<EditoraListaDTO> implements OnInit {
  dataSource: MatTableDataSource<EditoraListaDTO>;
  displayedColumns = ['nome', 'actions'];
  filter: string;

  constructor(
    private dialog: MatDialog,
    private editoraSerivce: EditoraService,
    private customDialogService: CustomDialogService,
    private snackbarService: SnackbarService,
  ) {
    super(editoraSerivce, 'nome');
  }

  ngOnInit(): void {
    super.init();
    this._loadData();
  }

  private _openDialog(editora?: EditoraListaDTO): void {
    const dialogRef = this.dialog
      .open(CriarEditoraComponent, {
        data: editora,
      })
      .afterClosed()
      .subscribe(() => {
        this._loadData();
      });
  }

  public criarEditora(): void {
    this._openDialog({});
  }

  public editarEditora(editora: EditoraListaDTO): void {
    this.editoraSerivce.findById(editora.id).subscribe((res) => {
      this._openDialog(res);
    });
  }

  public removerEditora(editora: EditoraListaDTO): void {
    this.customDialogService.openConfirmDialog().subscribe((res) => {
      if (res) {
        this._removerEditora(editora.id);
      }
    });
  }

  private _removerEditora(id: string): void {
    this.editoraSerivce.deletarEditora(id).subscribe((res) => {
      this.snackbarService.openSuccessSnackbar('Editora excluído com sucesso');
      this.handleReloadAfterDelete();
    });
  }
}
