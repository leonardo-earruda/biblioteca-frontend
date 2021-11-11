import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { CepDTO } from '../../dto/cep/cep-dto';
import { ClienteByIdDTO } from '../../dto/cliente/cliente-by-id-dto';
import { ClienteCriarAtualizarDTO } from '../../dto/cliente/cliente-dto';
import { getValuesTipoTelefone, TipoTelefoneEnum } from '../../enums/tipo-telefone.enum';
import { ClientePageComponent } from '../../pages/cliente-page/cliente-page.component';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-criar-cliente',
  templateUrl: './criar-cliente.component.html',
  styleUrls: ['./criar-cliente.component.scss'],
})
export class CriarClienteComponent implements OnInit {
  formCliente: FormGroup;
  telefone: FormGroup;
  tiposTelefones = getValuesTipoTelefone();
  isEditing: boolean;
  telMask = '0000-0000';
  tipoTelefoneSubscription: Subscription;
  tipoCepSubscription: Subscription;
  minDate: Date;
  maxDate: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) private cliente: ClienteByIdDTO,
    private clienteService: ClienteService,
    private dialogRef: MatDialogRef<ClientePageComponent>,
    private snackBarService: SnackbarService,
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 120, 11, 31);
    this.maxDate = new Date(currentYear + 0, 11, 31);
  }

  ngOnInit(): void {
    this._criarForm();
    this._initSubscription();
    this._initSubscriptions();
    this._verifyEditing();
  }

  private _criarForm(): void {
    this.formCliente = new FormGroup({
      nome: new FormControl(this.cliente.nome, [Validators.required, Validators.maxLength(100)]),
      cpf: new FormControl(this.cliente.cpf, [Validators.required, Validators.minLength(11), Validators.maxLength(14)]),
      dataNascimento: new FormControl(this.cliente.dataNascimento, Validators.required),
      telefone: new FormGroup({
        ddd: new FormControl(this.cliente.telefone?.ddd, Validators.required),
        numero: new FormControl(this.cliente.telefone?.numero, Validators.required),
        tipoTelefone: new FormControl(this.cliente.telefone?.tipoTelefone, Validators.required),
      }),
      endereco: new FormGroup({
        cep: new FormControl(this.cliente.endereco?.cep, [Validators.required, Validators.maxLength(9)]),
        cidade: new FormControl(this.cliente.endereco?.cidade, Validators.required),
        complemento: new FormControl(this.cliente.endereco?.complemento, Validators.maxLength(200)),
        estado: new FormControl(this.cliente.endereco?.estado, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2),
        ]),
        logradouro: new FormControl(this.cliente.endereco?.logradouro, Validators.required),
        numero: new FormControl(this.cliente.endereco?.numero, Validators.required),
      }),
    });
  }

  private _initSubscription(): void {
    this.tipoTelefoneSubscription = this.formCliente
      .get('telefone')
      .get('tipoTelefone')
      .valueChanges.subscribe((res: TipoTelefoneEnum) => {
        this.formCliente.get('telefone').get('numero').reset();
        if (res === TipoTelefoneEnum.FIXO) {
          this.telMask = '0000-0000';
        } else {
          this.telMask = '0 0000-0000';
        }
      });
  }

  private _initSubscriptions(): void {
    this.tipoCepSubscription = this.formCliente
      .get('endereco')
      .get('cep')
      .valueChanges.subscribe((cep) => {
        if (cep.length === 8) {
          this.buscarCep(cep);
        }
      });
  }

  private _verifyEditing(): void {
    this.isEditing = !!this.cliente.id;
  }

  public save(): void {
    const formCliente: ClienteCriarAtualizarDTO = this.formCliente.value;
    this.isEditing ? this._editarCliente(formCliente) : this._criarCliente(formCliente);
  }

  private _editarCliente(formCliente: ClienteCriarAtualizarDTO): void {
    this.clienteService.editarCliente(formCliente, this.cliente.id).subscribe((res) => {
      this.dialogRef.close();
      this.snackBarService.openSuccessSnackbar('Cliente editado com sucesso!');
    });
  }

  private _criarCliente(formCliente: ClienteCriarAtualizarDTO): void {
    this.clienteService.criarCliente(formCliente).subscribe((res) => {
      this.dialogRef.close();
      this.snackBarService.openSuccessSnackbar('Cliente criado com sucesso!');
    });
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public buscarCep(cep: string): void {
    this.clienteService.buscarCEP(cep).subscribe((res) => {
      const enderecoValue = this._mapFormEndereco(res);
      this.formCliente.get('endereco').setValue(enderecoValue);
    });
  }

  private _mapFormEndereco(res: CepDTO): any {
    return {
      cidade: res.localidade,
      complemento: res.complemento,
      logradouro: res.logradouro,
      cep: res.cep,
      estado: res.uf,
      numero: null,
    };
  }
}
