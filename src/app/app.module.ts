import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { MainRoutesModule } from 'src/main/routes.module';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MainRoutesModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
