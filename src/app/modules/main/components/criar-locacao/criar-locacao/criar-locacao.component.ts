import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LocacaoCriarDto } from '../../../dto/locacao/locacao-criar-dto';
import { LocacaoService } from '../../../services/locacao.service';
import { SnackbarService } from '../../../../../core/services/snackbar.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { InserirLivroLocacaoComponent } from '../../inserir-livro-locacao/inserir-livro-locacao.component';
import { DataService } from '../../../services/data.service';
import { LivroByIsbnDTO } from '../../../dto/livro/livro-by-isbn-dto';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-criar-locacao',
  templateUrl: './criar-locacao.component.html',
  styleUrls: ['./criar-locacao.component.scss'],
})
export class CriarLocacaoComponent implements OnInit {
  dataSource = new MatTableDataSource<LivroByIsbnDTO>();
  displayedColumns = ['isbn', 'titulo', 'autorNome'];
  formLocacao: FormGroup;
  minDate: Date;
  maxDate: Date;
  tipoDataPrevistaDevolucaoSubscription: Subscription;
  tipoCpfSubscription: Subscription;
  livro: LivroByIsbnDTO;
  bodyLocacaoCriar: LocacaoCriarDto;

  constructor(
    private clienteService: ClienteService,
    private locacaoService: LocacaoService,
    private snackBarService: SnackbarService,
    private dialogRef: MatDialogRef<CriarLocacaoComponent>,
    private dialog: MatDialog,
    private data: DataService,
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 1, 11, 31);
    this.maxDate = new Date(currentYear + 0, 11, 31);
  }

  ngOnInit(): void {
    this.dataSource.data = [];
    this._createForm();
    this._subscriptionDadosCliente();
    this._subscriptionDataLocacao();
  }

  private _createForm(): void {
    this.formLocacao = new FormGroup({
      dataLocacao: new FormControl('', Validators.required),
      dataPrevistaDevolucao: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      clienteNome: new FormControl('', Validators.required),
      clienteDataNascimento: new FormControl('', Validators.required),
    });
  }

  private _subscriptionDadosCliente(): void {
    this.tipoCpfSubscription = this.formLocacao.get('cpf').valueChanges.subscribe((cpf: string) => {
      this.preencherDadosCliente(cpf);
    });
  }

  private preencherDadosCliente(cpf: string): void {
    if (cpf.length === 11) {
      this.clienteService.findClienteByCpf(cpf).subscribe((response) => {
        const id = this.formLocacao.get('id');
        id.setValue(response.id);
        const clienteNome = this.formLocacao.get('clienteNome');
        clienteNome.setValue(response.nome);
        const clienteDataNascimento = moment(response.dataNascimento).format('DD-MM-YYYY');
        this.formLocacao.get('clienteDataNascimento').setValue(clienteDataNascimento);
      });
    }
  }

  private _subscriptionDataLocacao(): void {
    this.tipoDataPrevistaDevolucaoSubscription = this.formLocacao
      .get('dataLocacao')
      .valueChanges.subscribe((res: Date) => {
        this.addSevenDays(res);
      });
  }

  private addSevenDays(res): void {
    const dataPrevistaDevolucaoFormControl = this.formLocacao.get('dataPrevistaDevolucao');
    const value = moment(res).add(7, 'd').format('DD/MM/YYYY HH:mm:ss');
    dataPrevistaDevolucaoFormControl.setValue(value);
  }

  public save(): void {
    const locacao = this.formLocacao.getRawValue();
    locacao.livroIds = this.dataSource.data.map((a) => a.id);
    const novaLocacao = {
      clienteId: locacao.id,
      dataLocacao: moment(locacao.dataLocacao).format('YYYY-MM-DDThh:mm:ss'),
      dataPrevistaDevolucao: moment(locacao.dataPrevistaDevolucao).format('YYYY-MM-DDThh:mm:ss'),
      livroIds: locacao.livroIds,
    };
    this._criarLocacao(novaLocacao);
  }

  private _criarLocacao(novaLocacao: LocacaoCriarDto): void {
    this.locacaoService.criarLivro(novaLocacao).subscribe((res) => {
      this.dialogRef.close();
      this.snackBarService.openSuccessSnackbar('Locação realizada com sucesso!');
    });
  }

  public inserirLivro(): void {
    this.dialog
      .open(InserirLivroLocacaoComponent)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          const data = this.dataSource.data;
          data.push(this.data.getValue());
          this.dataSource.data = data;
        }
      });
  }
}
