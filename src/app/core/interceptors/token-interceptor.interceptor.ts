import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
  bypassUrl = ['/oauth/token', 'viacep'];

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this._isBypassUrl(request.url)) {
      return next.handle(request);
    }
    const token = this.tokenService.getAccessToken();
    if (!this.tokenService.isAccessTokenInvalid()) {
      request = this._addToken(request, token);
      return next.handle(request);
    } else {
      const newToken = this.tokenService.getAccessToken();
      this.tokenService.refreshToken().pipe(
        switchMap(() => {
          request = this._addToken(request, newToken);
          return next.handle(request);
        })
      );
    }
  }

  private _addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private _isBypassUrl(urlRequest: string): boolean {
    return this.bypassUrl.some((uri) => urlRequest.includes(uri));
  }
}
