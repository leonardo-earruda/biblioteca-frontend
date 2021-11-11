import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CustomDialogService } from 'src/app/core/services/custom-dialog.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { DefaultPaginatorSortDirective } from 'src/app/shared/utils/pagination-sorting/default-paginator-sort';
import { CriarClienteComponent } from '../../components/criar-cliente/criar-cliente.component';
import { AutorListaDTO } from '../../dto/autor/autor-lista-dto';
import { ClienteByIdDTO } from '../../dto/cliente/cliente-by-id-dto';
import { ClienteListaDTO } from '../../dto/cliente/cliente-lista-dto';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente-page',
  templateUrl: './cliente-page.component.html',
  styleUrls: ['./cliente-page.component.scss'],
})
export class ClientePageComponent extends DefaultPaginatorSortDirective<ClienteListaDTO> implements OnInit {
  dataSource: MatTableDataSource<ClienteListaDTO>;
  displayedColumns = ['nome', 'dataNascimento', 'cpf', 'telefoneCompleto', 'actions'];
  filter: string;

  constructor(
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private customDialog: CustomDialogService,
    private snackBarService: SnackbarService,
  ) {
    super(clienteService, 'nome');
  }

  ngOnInit(): void {
    super.init();
    this._loadData();
  }

  private _openDialog(cliente?: ClienteByIdDTO): void {
    this.dialog
      .open(CriarClienteComponent, {
        data: cliente,
      })
      .afterClosed()
      .subscribe(() => {
        this._loadData();
      });
  }

  public criarCliente(): void {
    this._openDialog({});
  }

  public editarCliente(cliente: ClienteListaDTO): void {
    this.clienteService.findById(cliente.id).subscribe((res) => {
      this._openDialog(res);
    });
  }

  public deletarCliente(autor: AutorListaDTO): void {
    this.customDialog.openConfirmDialog().subscribe((res) => {
      if (res) {
        this._deletarCliente(autor.id);
      }
    });
  }

  private _deletarCliente(autorId: string): void {
    this.clienteService.deletarCliente(autorId).subscribe((res) => {
      this.snackBarService.openSuccessSnackbar('Cliente excluído com sucesso!');
      this.handleReloadAfterDelete();
    });
  }
}
