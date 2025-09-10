import { NgModule } from '@angular/core';
import {
  XTableViewCell,
  XTableViewCellDef,
  XTableColumnDef,
  XTableFooterCell,
  XTableFooterCellDef,
  XTableHeaderCell,
  XTableHeaderCellDef
} from './cell';
import {
  XTableFooterRow,
  XTableFooterRowDef,
  XTableHeaderRow,
  XTableHeaderRowDef,
  XTableNoDataRow,
  XTableViewRow,
  XTableViewRowDef
} from './row';
import { XTableView } from './table-view.component';
import { CdkTableModule } from '@angular/cdk/table';
import { XTableTextColumn } from './text-column';

const EXPORTED_DECLARATIONS = [
  // Table
  XTableView,

  // Template defs
  XTableHeaderCellDef,
  XTableHeaderRowDef,
  XTableColumnDef,
  XTableViewCellDef,
  XTableViewRowDef,
  XTableFooterCellDef,
  XTableFooterRowDef,

  // Cell directives
  XTableHeaderCell,
  XTableViewCell,
  XTableFooterCell,

  // Row directives
  XTableHeaderRow,
  XTableViewRow,
  XTableFooterRow,
  XTableNoDataRow,

  XTableTextColumn
];

@NgModule({
  exports: [...EXPORTED_DECLARATIONS],
  imports: [CdkTableModule, ...EXPORTED_DECLARATIONS]
})
export class XTableViewModule {}
