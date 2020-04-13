import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XInputComponent } from './input.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XInputProperty } from './input.property';

@NgModule({
  declarations: [XInputComponent, XInputProperty],
  exports: [XInputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, XIconModule]
})
export class XInputModule {}
