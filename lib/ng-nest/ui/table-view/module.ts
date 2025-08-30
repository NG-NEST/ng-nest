import { NgModule } from '@angular/core';
import { XTableViewComponent } from './table-view';
import { XCell, XCellDef, XHeaderCell, XHeaderCellDef } from './cell';
import { XColumnDef } from './column';

@NgModule({
  exports: [XTableViewComponent, XCell, XHeaderCell, XCellDef, XHeaderCellDef, XColumnDef],
  imports: [XTableViewComponent, XCell, XHeaderCell, XCellDef, XHeaderCellDef, XColumnDef]
})
export class XTableViewModule {}
