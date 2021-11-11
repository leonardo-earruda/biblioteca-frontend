import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles = route.data.roles;
    if (this.tokenService.isAccessTokenInvalid()) {
      return this.tokenService.refreshToken().pipe(
        switchMap(() => of(this.checkRoles(roles))),
        catchError((err) => {
          console.log(err);
          this.tokenService.clearAccessToken();
          this.router.navigate['login'];
          return of(false);
        })
      );
    }
    return this.checkRoles(roles);
  }

  private checkRoles(roles: string): boolean {
    if (!roles) {
      return true;
    }

    if (!this.tokenService.hasAnyPermission(roles)) {
      this.router.navigate['403'];
    }
    return true;
  }
}
