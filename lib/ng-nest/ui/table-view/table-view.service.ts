import { Injectable } from '@angular/core';
import type { XTableViewCell, XTableHeaderCell } from './cell';
import type { XTableHeaderRow, XTableViewRow } from './row';

@Injectable()
export class XTableViewService {
  selectedCells: XTableViewCell[] = [];
  activedRows: XTableViewRow[] = [];
  selectedHeaderCell: XTableHeaderCell | null = null;
  activedHeaderCells: XTableHeaderCell[] = [];
  stickyHeaderRows: XTableHeaderRow[] = [];
}
