import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XPaginationModule } from '@ng-nest/ui/pagination';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XIconComponent } from '@ng-nest/ui/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { XEmptyComponent } from '@ng-nest/ui/empty';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { FormsModule } from '@angular/forms';
import {
  XTableProperty,
  XTableHeadProperty,
  XTableBodyProperty,
  XTableFootProperty
} from './table.property';
import { XTableComponent } from './table.component';
import { XTableHeadComponent } from './table-head.component';
import { XTableBodyComponent } from './table-body.component';
import { XTableFootComponent } from './table-foot.component';
import { XButtonComponent } from '@ng-nest/ui/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { XDragDirective } from '@ng-nest/ui/drag';

@NgModule({
  declarations: [
    XTableComponent,
    XTableProperty,
    XTableHeadComponent,
    XTableHeadProperty,
    XTableBodyComponent,
    XTableBodyProperty,
    XTableFootComponent,
    XTableFootProperty
  ],
  exports: [XTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    XPaginationModule,
    XOutletDirective,
    XCheckboxComponent,
    XIconComponent,
    XButtonComponent,
    ScrollingModule,
    DragDropModule,
    XEmptyComponent,
    XLoadingComponent,
    XDragDirective
  ]
})
export class XTableModule {}
