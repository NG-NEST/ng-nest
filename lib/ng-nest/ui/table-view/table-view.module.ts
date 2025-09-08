import { NgModule } from '@angular/core';
import {
  XTableCell,
  XTableCellDef,
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
  XTableRow,
  XTableRowDef
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
  XTableCellDef,
  XTableRowDef,
  XTableFooterCellDef,
  XTableFooterRowDef,

  // Cell directives
  XTableHeaderCell,
  XTableCell,
  XTableFooterCell,

  // Row directives
  XTableHeaderRow,
  XTableRow,
  XTableFooterRow,
  XTableNoDataRow,

  XTableTextColumn
];

@NgModule({
  exports: [...EXPORTED_DECLARATIONS],
  imports: [CdkTableModule, ...EXPORTED_DECLARATIONS]
})
export class XTableViewModule {}
