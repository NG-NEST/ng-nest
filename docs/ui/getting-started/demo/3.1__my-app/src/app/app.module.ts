import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XButtonModule } from '@ng-nest/ui/button';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    XButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
