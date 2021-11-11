import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { GlobalErrorHandler } from './error-handling';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorInterceptor } from './interceptors/token-interceptor.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule],
  providers: [
    JwtHelperService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: JwtHelperService,
      useValue: new JwtHelperService(),
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
