import { Injectable } from '@angular/core';
import { LivroByIsbnDTO } from '../dto/livro/livro-by-isbn-dto';


@Injectable({
  providedIn: 'root',
})
export class DataService {

  livro: LivroByIsbnDTO;
  hasNewValue = false;

  constructor() {
  }

  addValue(livro: LivroByIsbnDTO): void {
    this.livro = livro;
    this.hasNewValue = true;
  }

  getValue(): LivroByIsbnDTO {
    const livroValue = this.livro;
    this.hasNewValue = false;
    this.livro = undefined;
    return livroValue;
  }
}
