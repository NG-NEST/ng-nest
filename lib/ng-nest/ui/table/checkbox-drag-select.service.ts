import { Injectable } from '@angular/core';
import type { XTableRow } from './table.property';

@Injectable({ providedIn: 'root' })
export class XTableCheckboxDragSelectService {
  isMouseDown = false;
  isDragging = false;
  startIndex = -1;
  downValue = false;
  changeRows: XTableRow[] = [];
}
