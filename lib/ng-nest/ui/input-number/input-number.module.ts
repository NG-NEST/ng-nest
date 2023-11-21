import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XInputNumberComponent } from './input-number.component';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XInputNumberProperty } from './input-number.property';
import { XControlValueAccessor } from '@ng-nest/ui/base-form';
import { XInputModule } from '@ng-nest/ui/input';

@NgModule({
  declarations: [XInputNumberComponent, XInputNumberProperty],
  exports: [XInputNumberComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    XInputModule,
    XButtonComponent,
    XControlValueAccessor
  ]
})
export class XInputNumberModule {}
