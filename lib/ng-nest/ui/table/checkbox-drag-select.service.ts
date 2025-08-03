import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class XTableCheckboxDragSelectService {
  isDragging = false;
  startIndex = -1; // 记录起始行索引
}
