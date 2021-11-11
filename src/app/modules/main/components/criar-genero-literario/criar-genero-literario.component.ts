import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { GeneroLiterarioCriarAtualizarDTO } from '../../dto/genero-literario/genero-literario-dto';
import { GeneroLiterarioListaDTO } from '../../dto/genero-literario/generoliterario-lista-dto';
import { GeneroLiterarioPageComponent } from '../../pages/genero-literario-page/genero-literario-page.component';
import { GeneroLiterarioService } from '../../services/genero-literario.service';

@Component({
  selector: 'app-criar-genero-literario',
  templateUrl: './criar-genero-literario.component.html',
  styleUrls: ['./criar-genero-literario.component.scss'],
})
export class CriarGeneroLiterarioComponent implements OnInit {
  formGenero: FormGroup;
  isEditing: boolean;

  constructor(
    private generoService: GeneroLiterarioService,
    @Inject(MAT_DIALOG_DATA) private generoLiterario: GeneroLiterarioListaDTO,
    public dialogRef: MatDialogRef<GeneroLiterarioPageComponent>,
    private snackBarService: SnackbarService,
  ) {
  }

  ngOnInit(): void {
    this._createForm();
    this._verifyEditing();
  }

  private _createForm(): void {
    this.formGenero = new FormGroup({
      nome: new FormControl(this.generoLiterario.nome, Validators.required),
    });
  }

  private _verifyEditing(): void {
    this.isEditing = !!this.generoLiterario.id;
  }

  public save(): void {
    const formGenero: GeneroLiterarioCriarAtualizarDTO = this.formGenero.value;
    this.isEditing ? this._editarGeneroLiterario(formGenero) : this._criarGeneroLiterario(formGenero);
  }

  private _editarGeneroLiterario(formGenero: GeneroLiterarioCriarAtualizarDTO): void {
    this.generoService.editar(formGenero, this.generoLiterario.id).subscribe((res) => {
      this.dialogRef.close();
      this.snackBarService.openSuccessSnackbar('Genero literário editado com sucesso');
    });
  }

  private _criarGeneroLiterario(formGenero: GeneroLiterarioCriarAtualizarDTO): void {
    this.generoService.criar(formGenero).subscribe((res) => {
      this.dialogRef.close();
      this.snackBarService.openSuccessSnackbar('Genero literário criado com sucesso');
    });
  }

  public fecharDialog(): void {
    this.dialogRef.close();
  }
}
