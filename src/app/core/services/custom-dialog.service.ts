import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm-component/confirm.component';
import { ConfirmComponentData } from '../models/confirm-component-data.model';

@Injectable({
  providedIn: 'root',
})
export class CustomDialogService extends MatDialog {
  openConfirmDialog(mensagem: string = 'Deseja confirmar esta ação?'): Observable<boolean> {
    const msg: ConfirmComponentData = { mensagem: mensagem.toUpperCase() };
    return this.open(ConfirmComponent, { width: '16%', data: msg }).afterClosed();
  }
}
