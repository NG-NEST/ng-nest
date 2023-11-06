import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XPaginationModule } from '@ng-nest/ui/pagination';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XIconModule } from '@ng-nest/ui/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { XEmptyModule } from '@ng-nest/ui/empty';
import { XCheckboxModule } from '@ng-nest/ui/checkbox';
import { XLoadingModule } from '@ng-nest/ui/loading';
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
import { XButtonModule } from '@ng-nest/ui/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { XDragModule } from '@ng-nest/ui/drag';

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
    XOutletModule,
    XCheckboxModule,
    XIconModule,
    XButtonModule,
    ScrollingModule,
    DragDropModule,
    XEmptyModule,
    XLoadingModule,
    XDragModule
  ]
})
export class XTableModule {}
