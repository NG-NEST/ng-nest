import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShareModule } from '../share/share.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainRoutesModule } from 'src/main/routes.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientModule, ShareModule, MainRoutesModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
