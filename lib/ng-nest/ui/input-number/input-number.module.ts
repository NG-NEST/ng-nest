import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XInputNumberComponent } from './input-number.component';
import { XButtonModule } from '@ng-nest/ui/button';

@NgModule({
  declarations: [XInputNumberComponent],
  exports: [XInputNumberComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, XButtonModule]
})
export class XInputNumberModule {}
