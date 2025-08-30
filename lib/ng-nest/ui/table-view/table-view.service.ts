import { Injectable } from '@angular/core';
import type { XCell, XHeaderCell } from './cell';
import type { XRow } from './row';

@Injectable()
export class XTableViewService {
  selectedCells: XCell[] = [];
  activedRows: XRow[] = [];
  selectedHeaderCell: XHeaderCell | null = null;
  activedHeaderCell: XHeaderCell | null = null;
}
