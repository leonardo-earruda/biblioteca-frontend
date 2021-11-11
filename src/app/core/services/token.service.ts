import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, finalize, map, take } from 'rxjs/operators';
import { CLIENT_HEADER, PARAMS_REFRESH_TOKEN } from 'src/app/configs/http-header.const';
import { AuthService } from 'src/app/modules/main/services/auth.service';
import { JwtPayload } from '../models/jwt-payload.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private isRefreshing = false;
  private refreshSubject = new BehaviorSubject<string>(null);
  constructor(
    private jwtService: JwtHelperService,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  public armazenarToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  public isAccessTokenInvalid(): boolean {
    const token = this.getAccessToken();
    return !token || (!!token && this.jwtService.isTokenExpired(token));
  }

  private _hasPermission(permission: string): boolean {
    return !!this.getPayload() && !!this.getPayload().authorities && this.getPayload().authorities.includes(permission);
  }

  public hasAnyPermission(role: string): boolean {
    return !role || this._hasPermission(role);
  }

  public getPayload(): JwtPayload {
    const token = this.getAccessToken();
    return token ? this.jwtService.decodeToken(token) : null;
  }

  public getAuthoritiesFromAccessToken(): string[] {
    const token = this.getAccessToken();
    const decodedToken = this.jwtService.decodeToken(token);
    const authorities = decodedToken.authorities;
    return authorities;
  }

  public goBackToLoginScreen(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  public isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  public clearAccessToken(): void {
    localStorage.removeItem('access_token');
  }

  public refreshToken(): Observable<any> {
    if (!this.isRefreshing) {
      this.refreshSubject.next(null);
      this.isRefreshing = true;
      const headers = CLIENT_HEADER;
      const params = PARAMS_REFRESH_TOKEN;

      return this.http.post<any>(this.authService.url, null, { headers, withCredentials: true, params }).pipe(
        map((response) => {
          const token = response.access_token;
          this.armazenarToken(token);
          this.refreshSubject.next(token);
          return token;
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    } else {
      return this.refreshSubject.pipe(
        filter((token) => token !== null),
        take(1)
      );
    }
  }
}
