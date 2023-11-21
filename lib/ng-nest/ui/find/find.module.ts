import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XFindComponent } from './find.component';
import { XFindProperty } from './find.property';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule } from '@ng-nest/ui/dialog';
import { XTableModule } from '@ng-nest/ui/table';
import { XTagModule } from '@ng-nest/ui/tag';
import { XEmptyComponent } from '@ng-nest/ui/empty';
import { XTreeModule } from '@ng-nest/ui/tree';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XControlValueAccessor } from '@ng-nest/ui/base-form';
import { XInputModule } from '@ng-nest/ui/input';

@NgModule({
  declarations: [XFindComponent, XFindProperty],
  exports: [XFindComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    XTagModule,
    XButtonComponent,
    XDialogModule,
    XTableModule,
    XTreeModule,
    XIconComponent,
    XEmptyComponent,
    XInputModule,
    XControlValueAccessor
  ]
})
export class XFindModule {}
