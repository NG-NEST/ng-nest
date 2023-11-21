import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XTextareaComponent } from './textarea.component';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XTextareaProperty } from './textarea.property';
import { XControlValueAccessor } from '@ng-nest/ui/base-form';

@NgModule({
  declarations: [XTextareaComponent, XTextareaProperty],
  exports: [XTextareaComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, XIconComponent, XControlValueAccessor]
})
export class XTextareaModule {}
