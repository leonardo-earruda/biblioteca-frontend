import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { AutorCriarAtualizarDTO } from '../../dto/autor/autor-dto';
import { AutorListaDTO } from '../../dto/autor/autor-lista-dto';
import { AutorPageComponent } from '../../pages/autor-page/autor-page.component';
import { AutorService } from '../../services/autor.service';

@Component({
  selector: 'app-criar-autor',
  templateUrl: './criar-autor.component.html',
  styleUrls: ['./criar-autor.component.scss'],
})
export class CriarAutorComponent implements OnInit {
  formAutor: FormGroup;
  isEditing: boolean;
  maxDate: Date;

  constructor(
    private autorService: AutorService,
    @Inject(MAT_DIALOG_DATA) private autor: AutorListaDTO,
    public dialogRef: MatDialogRef<AutorPageComponent>,
    public dialogForm: MatDialogRef<CriarAutorComponent>,
    private snackBarService: SnackbarService,
  ) {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear + 0, 11, 31);
  }

  ngOnInit(): void {
    this._createForm();
    this._verifyEditing();
  }

  private _createForm(): void {
    this.formAutor = new FormGroup({
      nome: new FormControl(this.autor.nome, Validators.required),
      dataNascimento: new FormControl(this.autor.dataNascimento, Validators.required),
      nacionalidade: new FormControl(this.autor.nacionalidade, Validators.required),
    });
  }

  private _verifyEditing(): void {
    this.isEditing = !!this.autor.id;
  }

  public save(): void {
    const formAutor: AutorCriarAtualizarDTO = this.formAutor.value;
    this.isEditing ? this.editarAutor(formAutor) : this.criarAutor(formAutor);
  }

  private editarAutor(formAutor: AutorCriarAtualizarDTO): void {
    this.autorService.edit(formAutor, this.autor.id).subscribe(() => {
      this.dialogRef.close();
      this.snackBarService.openSuccessSnackbar('Autor Editado com sucesso!');
    });
  }

  private criarAutor(formAutor: AutorCriarAtualizarDTO): void {
    this.autorService.criarAutor(formAutor).subscribe(() => {
      this.dialogRef.close();
      this.snackBarService.openSuccessSnackbar('Autor criado com sucesso!');
    });
  }
}
