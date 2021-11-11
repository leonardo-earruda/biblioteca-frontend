import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  PERMISSAO_AUTOR,
  PERMISSAO_CLIENTE,
  PERMISSAO_EDITORA,
  PERMISSAO_ESTOQUE,
  PERMISSAO_GENLIT,
  PERMISSAO_LIVRO,
  PERMISSAO_LOCACAO,
} from './configs/roles-const';
import { LoginGuardGuard } from './core/guards/login-guard.guard';
import { PermissionGuard } from './core/guards/permission.guard';
import { NavigationBarComponent } from './modules/main/components/navigation-bar/navigation-bar.component';
import { AutorPageComponent } from './modules/main/pages/autor-page/autor-page.component';
import { BemVindoPageComponent } from './modules/main/pages/bem-vindo-page/bem-vindo-page.component';
import { ClientePageComponent } from './modules/main/pages/cliente-page/cliente-page.component';
import { EditoraPageComponent } from './modules/main/pages/editora-page/editora-page.component';
import { EstoquePageComponent } from './modules/main/pages/estoque-page/estoque-page.component';
import { ForbiddenPageComponent } from './modules/main/pages/forbidden-page/forbidden-page.component';
import { GeneroLiterarioPageComponent } from './modules/main/pages/genero-literario-page/genero-literario-page.component';
import { LivroPageComponent } from './modules/main/pages/livro-page/livro-page.component';
import { LocacaoPageComponent } from './modules/main/pages/locacao-page/locacao-page.component';
import { LoginPageComponent } from './modules/main/pages/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationBarComponent,
    children: [
      {
        path: 'bem-vindo',
        component: BemVindoPageComponent,
      },
      {
        path: 'autores',
        component: AutorPageComponent,
        canActivate: [PermissionGuard],
        data: { roles: PERMISSAO_AUTOR },
      },
      {
        path: 'livros',
        component: LivroPageComponent,
        canActivate: [PermissionGuard],
        data: { roles: PERMISSAO_LIVRO },
      },
      {
        path: 'editoras',
        component: EditoraPageComponent,
        canActivate: [PermissionGuard],
        data: { roles: PERMISSAO_EDITORA },
      },
      {
        path: 'clientes',
        component: ClientePageComponent,
        canActivate: [PermissionGuard],
        data: { roles: PERMISSAO_CLIENTE },
      },
      {
        path: 'generos-literarios',
        component: GeneroLiterarioPageComponent,
        canActivate: [PermissionGuard],
        data: { roles: PERMISSAO_GENLIT },
      },
      {
        path: 'estoque',
        component: EstoquePageComponent,
        canActivate: [PermissionGuard],
        data: { roles: PERMISSAO_ESTOQUE },
      },
      {
        path: 'locacoes',
        component: LocacaoPageComponent,
        canActivate: [PermissionGuard],
        data: { roles: PERMISSAO_LOCACAO },
      },
      {
        path: '403',
        component: ForbiddenPageComponent,
      },
    ],
  },
  { path: 'login', component: LoginPageComponent, canActivate: [LoginGuardGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
