import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XFindComponent } from './find.component';
import { XFindProperty } from './find.property';
import { XButtonModule } from '@ng-nest/ui/button';
import { XDialogModule } from '@ng-nest/ui/dialog';
import { XTableModule } from '@ng-nest/ui/table';
import { XTagModule } from '@ng-nest/ui/tag';
import { XEmptyModule } from '@ng-nest/ui/empty';
import { XTreeModule } from '@ng-nest/ui/tree';
import { XIconModule } from '@ng-nest/ui/icon';

@NgModule({
  declarations: [XFindComponent, XFindProperty],
  exports: [XFindComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    XTagModule,
    XButtonModule,
    XDialogModule,
    XTableModule,
    XTreeModule,
    XIconModule,
    XEmptyModule
  ]
})
export class XFindModule {}
