import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XPaginationModule } from '@ng-nest/ui/pagination';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XIconModule } from '@ng-nest/ui/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { XEmptyModule } from '@ng-nest/ui/empty';
import { XTableProperty, XTableHeadProperty, XTableBodyProperty, XTableFootProperty } from './table.property';
import { XTableComponent } from './table.component';
import { XTableHeadComponent } from './table-head.component';
import { XTableBodyComponent } from './table-body.component';
import { XTableFootComponent } from './table-foot.component';

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
  imports: [CommonModule, XPaginationModule, XOutletModule, XIconModule, ScrollingModule, XEmptyModule]
})
export class XTableModule {}
