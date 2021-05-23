import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XTextareaComponent } from './textarea.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XTextareaProperty } from './textarea.property';
import { XBaseFormModule } from '@ng-nest/ui/base-form';

@NgModule({
  declarations: [XTextareaComponent, XTextareaProperty],
  exports: [XTextareaComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, XIconModule, XBaseFormModule]
})
export class XTextareaModule {}
