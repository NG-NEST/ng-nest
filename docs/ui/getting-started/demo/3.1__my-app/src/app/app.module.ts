import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { XButtonComponent } from '@ng-nest/ui/button';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    XButtonComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
