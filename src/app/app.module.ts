import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgMoonModule } from 'ng-moon';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgMoonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
