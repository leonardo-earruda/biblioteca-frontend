import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { SnackbarService } from './services/snackbar.service';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  constructor(private zone: NgZone, private snackBarService: SnackbarService) {
    super();
  }

  async handleError(errorResponse): Promise<void> {
    super.handleError(errorResponse);
    if (errorResponse instanceof HttpErrorResponse) {
      const message = await this._getMessage(errorResponse);
      this.zone.run(() => {
        switch (errorResponse.status) {
          case 404:
            this.snackBarService.openErrorSnackbar(message || 'O recurso não foi encontrado');
            break;

          default:
            this.snackBarService.openErrorSnackbar(message || 'Ocorreu um erro!');
        }
      });
    }
  }

  private async _getMessage(errorResponse: HttpErrorResponse): Promise<string> {
    return !!errorResponse.error ? errorResponse.error.mensagem : null;
  }
}
