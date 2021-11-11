import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material/material.module';
import { MainModule } from './modules/main/main.module';
import { SharedModule } from './shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule } from 'ngx-mask';
import { NavigationBarComponent } from './modules/main/components/navigation-bar/navigation-bar.component';
import { NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [AppComponent, NavigationBarComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule,
    MaterialModule,
    SharedModule,
    MainModule,
    FlexLayoutModule,
    NgxMaskModule.forRoot(),
    NgxMatNativeDateModule,
  ],

  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
