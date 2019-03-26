import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NmInputComponent } from './nm-input.component';

@NgModule({
  declarations: [NmInputComponent],
  exports: [NmInputComponent],
  imports: [
    CommonModule
  ]
})
export class NmInputModule { }
