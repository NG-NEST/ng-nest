import { NgModule } from '@angular/core';
import { XTableComponent } from './table.component';
import { XTableHeadComponent } from './table-head.component';
import { XTableBodyComponent } from './table-body.component';
import { XTableFootComponent } from './table-foot.component';

@NgModule({
  exports: [XTableComponent],
  imports: [XTableComponent, XTableHeadComponent, XTableBodyComponent, XTableFootComponent]
})
export class XTableModule {}
