import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainRoutesModule } from 'src/main/routes.module';
import { HttpClientModule } from '@angular/common/http';
import { en_US, X_I18N } from '@ng-nest/ui/i18n';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, MainRoutesModule],
  providers: [{ provide: X_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {}
