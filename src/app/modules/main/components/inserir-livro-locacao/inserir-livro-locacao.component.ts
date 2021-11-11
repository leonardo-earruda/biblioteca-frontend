import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LivroService } from '../../services/livro.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-inserir-livro-locacao',
  templateUrl: './inserir-livro-locacao.component.html',
  styleUrls: ['./inserir-livro-locacao.component.scss'],
})
export class InserirLivroLocacaoComponent implements OnInit {
  formLivroLocacao: FormGroup;
  tipoLivroIsbnSubscription: Subscription;

  constructor(private livroService: LivroService, private data: DataService) {
  }

  ngOnInit(): void {
    this._createForm();
    this._initSubscription();
  }

  private _createForm(): void {
    this.formLivroLocacao = new FormGroup({
      isbn: new FormControl('', Validators.required),
      titulo: new FormControl('', Validators.required),
      autorNome: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
    });
  }

  private _initSubscription(): void {
    this.tipoLivroIsbnSubscription = this.formLivroLocacao.get('isbn').valueChanges.subscribe((res: string) => {
      if (res.length === 12) {
        this.livroService.findLivroByIsbn(res).subscribe((response) => {
          this.formLivroLocacao.setValue(response, {
            emitEvent: false,
          });
          this.formLivroLocacao.get('titulo').disable();
          this.formLivroLocacao.get('autorNome').disable();
        });
      }
    });
  }

  public confirmar(): void {
    this.data.addValue(this.formLivroLocacao.getRawValue());
    console.log(this.data);
  }
}
