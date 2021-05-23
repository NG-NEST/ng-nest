import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XListComponent } from './list.component';
import { XListOptionComponent } from './list-option.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { XListOptionProperty, XListProperty } from './list.property';
import { XEmptyModule } from '@ng-nest/ui/empty';
import { A11yModule } from '@angular/cdk/a11y';
import { XBaseFormModule } from '@ng-nest/ui/base-form';

@NgModule({
  declarations: [XListComponent, XListOptionComponent, XListProperty, XListOptionProperty],
  exports: [XListComponent, XListOptionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    A11yModule,
    XIconModule,
    XEmptyModule,
    XBaseFormModule
  ]
})
export class XListModule {}
