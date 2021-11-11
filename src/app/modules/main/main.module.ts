import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { CriarAutorComponent } from './components/criar-autor/criar-autor.component';
import { CriarClienteComponent } from './components/criar-cliente/criar-cliente.component';
import { CriarEditoraComponent } from './components/criar-editora/criar-editora.component';
import { CriarGeneroLiterarioComponent } from './components/criar-genero-literario/criar-genero-literario.component';
import { CriarLivroComponent } from './components/criar-livro/criar-livro.component';
import { AutorPageComponent } from './pages/autor-page/autor-page.component';
import { ClientePageComponent } from './pages/cliente-page/cliente-page.component';
import { EditoraPageComponent } from './pages/editora-page/editora-page.component';
import { GeneroLiterarioPageComponent } from './pages/genero-literario-page/genero-literario-page.component';
import { LivroPageComponent } from './pages/livro-page/livro-page.component';
import { NgxMaskModule } from 'ngx-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocacaoPageComponent } from './pages/locacao-page/locacao-page.component';
import { EstoquePageComponent } from './pages/estoque-page/estoque-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CriarLocacaoComponent } from './components/criar-locacao/criar-locacao/criar-locacao.component';
import { InserirLivroLocacaoComponent } from './components/inserir-livro-locacao/inserir-livro-locacao.component';
import { AppTableCounterComponent } from './pages/app-table-counter/app-table-counter.component';
import { BemVindoPageComponent } from './pages/bem-vindo-page/bem-vindo-page.component';
import { ForbiddenPageComponent } from './pages/forbidden-page/forbidden-page.component';
import { MatInputModule } from '@angular/material/input';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LoginPageComponent } from './pages/login-page/login-page.component';


@NgModule({
  declarations: [
    AutorPageComponent,
    LivroPageComponent,
    EditoraPageComponent,
    GeneroLiterarioPageComponent,
    ClientePageComponent,
    CriarAutorComponent,
    CriarLivroComponent,
    CriarEditoraComponent,
    CriarGeneroLiterarioComponent,
    CriarClienteComponent,
    LocacaoPageComponent,
    EstoquePageComponent,
    CriarLocacaoComponent,
    InserirLivroLocacaoComponent,
    AppTableCounterComponent,
    LoginPageComponent,
    BemVindoPageComponent,
    ForbiddenPageComponent,
  ],

  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxMaskModule.forChild(),
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
  ],
})

export class MainModule {}
