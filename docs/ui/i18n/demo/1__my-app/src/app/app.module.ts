import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { en_US, X_I18N } from '@ng-nest/ui/i18n';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [{ provide: X_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {}
