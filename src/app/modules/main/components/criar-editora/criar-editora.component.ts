import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { EditoraByIdDTO } from '../../dto/editora/editora-by-id-dto';
import { EditoraCriarAtualizarDTO } from '../../dto/editora/editora-dto';
import { EditoraListaDTO } from '../../dto//editora/editora-lista-dto';
import { EditoraService } from '../../services/editora.service';

@Component({
  selector: 'app-criar-editora',
  templateUrl: './criar-editora.component.html',
  styleUrls: ['./criar-editora.component.scss'],
})
export class CriarEditoraComponent implements OnInit {
  formEditora: FormGroup;
  isEditing: boolean;

  constructor(
    private editoraService: EditoraService,
    private dialogRef: MatDialogRef<CriarEditoraComponent>,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) private editora: EditoraListaDTO,
  ) {
  }

  ngOnInit(): void {
    this._createform();
    this._verifyEditing();
  }

  private _createform(): void {
    this.formEditora = new FormGroup({
      nome: new FormControl(this.editora.nome, [Validators.required, Validators.maxLength(50)]),
    });
  }

  private _verifyEditing(): void {
    this.isEditing = !!this.editora.id;
  }

  public save(): void {
    const formEditora: EditoraCriarAtualizarDTO = this.formEditora.value;
    this.isEditing ? this._editarEditora(formEditora) : this._criarEditora(formEditora);
  }

  private _criarEditora(formEditora: EditoraCriarAtualizarDTO): void {
    this.editoraService.criarEditora(formEditora).subscribe((res) => {
      this.dialogRef.close();
      this.snackbarService.openSuccessSnackbar('Editora criada com sucesso');
    });
  }

  private _editarEditora(formEditora: EditoraByIdDTO): void {
    this.editoraService.editarEditora(formEditora, this.editora.id).subscribe((res) => {
      this.dialogRef.close();
      this.snackbarService.openSuccessSnackbar('Editora editada com sucesso!');
    });
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
