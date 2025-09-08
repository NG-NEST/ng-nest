import { Injectable } from '@angular/core';
import type { XTableCell, XTableHeaderCell } from './cell';
import type { XTableHeaderRow, XTableRow } from './row';

@Injectable()
export class XTableViewService {
  selectedCells: XTableCell[] = [];
  activedRows: XTableRow[] = [];
  selectedHeaderCell: XTableHeaderCell | null = null;
  activedHeaderCells: XTableHeaderCell[] = [];
  stickyHeaderRows: XTableHeaderRow[] = [];
}
