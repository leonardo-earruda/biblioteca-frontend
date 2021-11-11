import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ConfirmComponent } from './components/confirm/confirm-component/confirm.component';
import { SituacaoEnumPipe } from './utils/pipes/situacao-enum.pipe';

@NgModule({
  declarations: [ConfirmComponent, SituacaoEnumPipe],
  imports: [MaterialModule, CommonModule],
  exports: [
    SituacaoEnumPipe,
  ],
})
export class SharedModule {
}
