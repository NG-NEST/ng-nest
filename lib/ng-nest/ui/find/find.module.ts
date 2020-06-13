import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XFindComponent } from './find.component';
import { XFindProperty } from './find.property';
import { XButtonModule } from '@ng-nest/ui/button';
import { XDialogModule } from '@ng-nest/ui/dialog';
import { XTableModule } from '@ng-nest/ui/table';

@NgModule({
  declarations: [XFindComponent, XFindProperty],
  exports: [XFindComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, XButtonModule, XDialogModule, XTableModule]
})
export class XFindModule {}
