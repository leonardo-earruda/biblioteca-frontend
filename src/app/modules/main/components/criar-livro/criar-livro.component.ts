import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { DropdownDTO } from '../../dto/dropdown/dropdown-dto';
import { LivroByIdDTO } from '../../dto/livro/livro-by-id-dto.model';
import { LivroCriarAtualizarDTO } from '../../dto/livro/livro-dto';
import { AutorService } from '../../services/autor.service';
import { EditoraService } from '../../services/editora.service';
import { GeneroLiterarioService } from '../../services/genero-literario.service';
import { LivroService } from '../../services/livro.service';

@Component({
  selector: 'app-criar-livro',
  templateUrl: './criar-livro.component.html',
  styleUrls: ['./criar-livro.component.scss'],
})
export class CriarLivroComponent implements OnInit {
  formLivro: FormGroup;
  isEditing: Boolean;
  autores: DropdownDTO[];
  generosLiterarios: DropdownDTO[];
  editoras: DropdownDTO[];
  maxDate: Date;

  constructor(
    private editoraService: EditoraService,
    private livroService: LivroService,
    private autorService: AutorService,
    private generoLiterarioService: GeneroLiterarioService,
    private dialogRef: MatDialogRef<CriarLivroComponent>,
    private snackBarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) private livro: LivroByIdDTO,
  ) {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear + 0, 11, 31);
  }

  ngOnInit(): void {
    this._createForm();
    this._findDropdownAutor();
    this._findDropdownGeneroLiterario();
    this._findDropdownEditora();
    this._verifyEditing();
    this.disableQuantidadeDisponivelForm();
  }

  private _createForm(): void {
    this.formLivro = new FormGroup({
      titulo: new FormControl(this.livro.titulo, [Validators.maxLength(50)]),
      isbn: new FormControl(this.livro.isbn, [Validators.required, Validators.maxLength(15)]),
      quantidadeDisponivel: new FormControl(this.livro.quantidadeDisponivel, [Validators.required]),
      dataPublicacao: new FormControl(this.livro.dataPublicacao, Validators.required),
      autorId: new FormControl(this.livro.autorId, Validators.required),
      generoLiterarioId: new FormControl(this.livro.generoLiterarioId, Validators.required),
      editoraId: new FormControl(this.livro.editoraId, Validators.required),
    });
  }

  private _findDropdownAutor(): void {
    this.autorService.findForDropdown().subscribe((res) => {
      this.autores = res;
    });
  }

  private _findDropdownGeneroLiterario(): void {
    this.generoLiterarioService.findForDropdown().subscribe((res) => {
      this.generosLiterarios = res;
    });
  }

  private _findDropdownEditora(): void {
    this.editoraService.findForDropdown().subscribe((res) => {
      this.editoras = res;
    });
  }

  private _verifyEditing(): void {
    this.isEditing = !!this.livro.id;
  }

  public save(): void {
    const formLivro: LivroCriarAtualizarDTO = this.formLivro.value;
    this.isEditing ? this._editarLivro(formLivro) : this._criarLivro(formLivro);
  }

  private _editarLivro(formLivro: LivroCriarAtualizarDTO): void {
    this.livroService.edit(formLivro, this.livro.id).subscribe((res) => {
      this.snackBarService.openSuccessSnackbar('Livro editado com sucesso');
      this.fecharDialog();
    });
  }

  private _criarLivro(formLivro: LivroCriarAtualizarDTO): void {
    this.livroService.criarLivro(formLivro).subscribe((res) => {
      this.snackBarService.openSuccessSnackbar('Livro criado com sucesso!');
      this.fecharDialog();
    });
  }

  public fecharDialog(): void {
    this.dialogRef.close();
  }

  private disableQuantidadeDisponivelForm(): void {
    if (this.isEditing) {
      this.formLivro.get('quantidadeDisponivel').disable();
    }
  }
}
