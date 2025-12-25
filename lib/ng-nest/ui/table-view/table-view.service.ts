import { Injectable } from '@angular/core';
import type {
  XTableHeaderCellHandle,
  XTableHeaderRowHandle,
  XTableViewCellHandle,
  XTableViewRowHandle
} from './table-view.property';

@Injectable()
export class XTableViewService {
  selectedCells: XTableViewCellHandle[] = [];
  activedRows: XTableViewRowHandle[] = [];
  selectedHeaderCell: XTableHeaderCellHandle | null = null;
  activedHeaderCells: XTableHeaderCellHandle[] = [];
  stickyHeaderRows: XTableHeaderRowHandle[] = [];
}
