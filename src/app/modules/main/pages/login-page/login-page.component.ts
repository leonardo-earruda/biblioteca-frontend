import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;

  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router) {}

  ngOnInit(): void {
    this._loginFormInit();
  }

  private _loginFormInit() {
    this.loginForm = new FormGroup({
      usuario: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
    });
  }

  public logar() {
    const usuario = this.loginForm.value.usuario;
    const senha = this.loginForm.value.senha;
    this.authService.loginAutorizacao(usuario, senha).subscribe((res) => {
      this.tokenService.armazenarToken(res.access_token);
      this.router.navigate(['bem-vindo']);
    });
  }
}
